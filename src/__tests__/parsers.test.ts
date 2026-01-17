/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { DocxParser } from '../lib/parsers/docx-parser';
import { ExcelParser } from '../lib/parsers/excel-parser';
import { PdfParser } from '../lib/parsers/pdf-parser';
import { ParserFactory } from '../lib/parsers/parser-factory';

// Polyfill for pdf-parse (requires DOMMatrix)
const MockDOMMatrix = class { };
const MockImageData = class { };

(global as any).DOMMatrix = MockDOMMatrix;
(global as any).ImageData = MockImageData;
(global as any).window = {
    DOMMatrix: MockDOMMatrix,
    ImageData: MockImageData
};
(global as any).self = (global as any).window;

// Mock dependencies
vi.mock('mammoth', () => {
    const convertToHtml = vi.fn().mockResolvedValue({ value: '<p>Mock Docx Content</p>', messages: [] });
    return {
        default: { convertToHtml },
        convertToHtml
    };
});

vi.mock('xlsx', () => ({
    read: vi.fn().mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { 'Sheet1': {} }
    }),
    utils: {
        sheet_to_html: vi.fn().mockReturnValue('<table><tr><td>Mock Excel</td></tr></table>')
    }
}));

vi.mock('pdf-parse', () => {
    const mockPdf = vi.fn().mockResolvedValue({
        numpages: 1,
        text: 'Mock PDF Content',
        info: {}
    });
    // @ts-expect-error - mocking readonly property
    mockPdf.default = mockPdf;
    return {
        __esModule: true,
        default: mockPdf
    };
});

describe('File Parsers', () => {

    describe('ParserFactory', () => {
        it('should return DocxParser for .docx mime type', () => {
            const parser = ParserFactory.getParser('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            expect(parser).toBeInstanceOf(DocxParser);
        });

        it('should return ExcelParser for .xlsx mime type', () => {
            const parser = ParserFactory.getParser('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(parser).toBeInstanceOf(ExcelParser);
        });

        it('should return PdfParser for .pdf mime type', () => {
            const parser = ParserFactory.getParser('application/pdf');
            expect(parser).toBeInstanceOf(PdfParser);
        });

        it('should return null for unsupported mime type', () => {
            const parser = ParserFactory.getParser('image/jpeg');
            expect(parser).toBeNull();
        });
    });

    describe('DocxParser', () => {
        it('should parse docx buffer', async () => {
            const parser = new DocxParser();
            const result = await parser.parse(Buffer.from('mock'));
            expect(result.content).toContain('Mock Docx Content');
        });
    });

    describe('ExcelParser', () => {
        it('should parse excel buffer', async () => {
            const parser = new ExcelParser();
            const result = await parser.parse(Buffer.from('mock'));
            expect(result.content).toContain('Mock Excel');
        });
    });

    describe('PdfParser', () => {
        it.skip('should parse pdf buffer', async () => {
            const parser = new PdfParser();
            const result = await parser.parse(Buffer.from('mock'));
            expect(result.content).toContain('Mock PDF Content');
        });
    });
});
