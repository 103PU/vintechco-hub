"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Trash, Box, Building, FileText, Search, X, Tag } from "lucide-react" // Restore Tag icon
import { deleteDocuments } from "../../actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ManageDepartmentsDialog } from "./manage-departments-dialog"
import { ManageDocumentTypesDialog } from "./manage-document-types-dialog"
import { ManageMasterDepartmentsDialog } from "./manage-master-departments-dialog"
import { MasterTagsDialog } from "./master-tags-dialog" // Restore
import { ManageTagsDialog } from "./manage-tags-dialog" // Restore
import { ManageTopicsDialog } from "./manage-topics-dialog" // NEW import
import { AssignTypeDialog } from "./assign-type-dialog"
import { AssignTopicDialog } from "./assign-topic-dialog"
import { DocumentData } from "./columns"
import { toast } from "sonner"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    documentTypeOptions: { label: string; value: string }[]
    departmentOptions: { label: string; value: string }[]
    topicOptions: { label: string; value: string }[]
    tagOptions: { label: string; value: string }[]
    brandOptions: { label: string; value: string }[]
    modelOptions: { label: string; value: string }[]
}

export function DataTableToolbar<TData>({
    table,
    documentTypeOptions,
    departmentOptions,
    topicOptions,
    tagOptions,
    brandOptions,
    modelOptions,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const handleDeleteSelected = async () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as any).id); // eslint-disable-line @typescript-eslint/no-explicit-any
        const result = await deleteDocuments(selectedIds);
        if (result.success) {
            toast.success(`Đã xóa thành công ${selectedIds.length} mục.`);
            table.resetRowSelection();
        } else {
            toast.error("Đã có lỗi xảy ra khi xóa hàng loạt.");
        }
    }

    const selectedRows = table.getFilteredSelectedRowModel().rows;

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

                {/* SEARCH & FILTERS */}
                <div className="flex flex-1 items-center gap-3 w-full lg:w-auto">
                    <div className="relative shrink-0">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Tìm kiếm..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="h-9 w-full sm:w-[200px] pl-8 shadow-sm"
                        />
                    </div>

                    <span className="text-sm font-semibold text-gray-600 shrink-0">Bộ lọc:</span>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">

                        {/* 1. DEPARTMENT FILTER (MAIN) */}
                        {table.getColumn("departments") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("departments")}
                                title="Bộ phận"
                                options={departmentOptions}
                            />
                        )}

                        {/* 2. CATEGORY FILTER (MAIN) */}
                        {table.getColumn("documentType") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("documentType")}
                                title="Phân Mục"
                                options={documentTypeOptions}
                            />
                        )}

                        {/* SECONDARY FILTERS - COMPACT or GROUPED */}
                        {/* We could use a Sheet or Popover here. For now, let's just make them visible but maybe visually distinct, 
                            or if we strictly follow "Dropdown Menu", we need a custom component. 
                            Given the constraints, keeping them inline but possibly ensuring they don't wrap ugly is key.
                            However, the user showed "Rừng Nút". 
                            Let's implement a "More Filters" button that is a Popover containing the other filters? 
                            No, FacetedFilter is Popover. 
                            Let's just keep Topic as Main? No, Topic is Level 3.
                            Brand/Model/Tag are Level 4.
                        */}

                        <div className="h-4 w-px bg-gray-300 mx-2 hidden lg:block" />

                        {table.getColumn("topic") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("topic")}
                                title="Topic"
                                options={topicOptions}
                            />
                        )}
                        {/* Brand/Model/Tags - Only show if space permits or put in a 'Advanced' toggle? 
                             Let's keep them for now but maybe make the list scrollable horizontal if too many. 
                             The current `overflow-x-auto` handles it. 
                         */}
                        {table.getColumn("brand") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("brand")}
                                title="Hãng"
                                options={brandOptions}
                            />
                        )}

                        {isFiltered && (
                            <Button
                                variant="ghost"
                                onClick={() => table.resetColumnFilters()}
                                className="h-8 px-2 lg:px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                Reset
                                <X className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* MANAGEMENT GROUP - CLEANED UP */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0">

                    {/* MORE FILTERS (Model, Tags) - Restored but cleaner */}
                    {table.getColumn("model") && (
                        <div className="hidden xl:block">
                            <DataTableFacetedFilter
                                column={table.getColumn("model")}
                                title="Model"
                                options={modelOptions}
                            />
                        </div>
                    )}
                    {table.getColumn("tags") && (
                        <div className="hidden xl:block">
                            <DataTableFacetedFilter
                                column={table.getColumn("tags")}
                                title="Tags"
                                options={tagOptions}
                            />
                        </div>
                    )}

                    <div className="h-6 w-px bg-gray-300 mx-2 hidden lg:block" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Box className="h-4 w-4" />
                                <span className="hidden sm:inline">Quản lý Hệ thống</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Danh mục dữ liệu</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <ManageMasterDepartmentsDialog>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Building className="mr-2 h-4 w-4 text-indigo-600" />
                                    <span>Bộ phận</span>
                                </DropdownMenuItem>
                            </ManageMasterDepartmentsDialog>

                            <ManageDocumentTypesDialog>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <FileText className="mr-2 h-4 w-4 text-blue-600" />
                                    <span>Phân Mục</span>
                                </DropdownMenuItem>
                            </ManageDocumentTypesDialog>

                            <ManageTopicsDialog>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Box className="mr-2 h-4 w-4 text-orange-600" />
                                    <span>Loại (Topic)</span>
                                </DropdownMenuItem>
                            </ManageTopicsDialog>

                            <MasterTagsDialog>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Tag className="mr-2 h-4 w-4 text-purple-600" />
                                    <span>Tags & Model</span>
                                </DropdownMenuItem>
                            </MasterTagsDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link
                        href="/admin/documents/new"
                        className="h-9 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-sm shrink-0 shadow-blue-200"
                    >
                        <PlusCircle size={16} />
                        <span>Tạo mới</span>
                    </Link>
                </div>
            </div>

            {/* BULK ACTIONS BAR */}
            {selectedRows.length > 0 && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2 overflow-x-auto">
                    <span className="text-sm text-blue-700 font-medium px-2 shrink-0">Chọn {selectedRows.length}:</span>

                    {/* 1. Assign Department */}
                    <ManageDepartmentsDialog
                        documentIds={selectedRows.map(row => (row.original as DocumentData).id)}
                        initialDepartments={[]}
                    >
                        <Button variant="outline" size="sm" className="h-8 bg-white border-blue-200 text-blue-700 hover:bg-blue-100 shadow-sm shrink-0">
                            <Building className="mr-2 h-3.5 w-3.5" />
                            Gán Bộ phận
                        </Button>
                    </ManageDepartmentsDialog>

                    {/* 2. Assign Category */}
                    <AssignTypeDialog
                        documentIds={selectedRows.map(row => (row.original as DocumentData).id)}
                    >
                        <Button variant="outline" size="sm" className="h-8 bg-white border-blue-200 text-blue-700 hover:bg-blue-100 shadow-sm shrink-0">
                            <FileText className="mr-2 h-3.5 w-3.5" />
                            Gán Phân Mục
                        </Button>
                    </AssignTypeDialog>

                    {/* 3. Assign Topic */}
                    <AssignTopicDialog
                        documentIds={selectedRows.map(row => (row.original as DocumentData).id)}
                    >
                        <Button variant="outline" size="sm" className="h-8 bg-white border-blue-200 text-blue-700 hover:bg-blue-100 shadow-sm shrink-0">
                            <Box className="mr-2 h-3.5 w-3.5" />
                            Gán Loại
                        </Button>
                    </AssignTopicDialog>

                    {/* 4. Assign Tags */}
                    <ManageTagsDialog
                        documentIds={selectedRows.map(row => (row.original as DocumentData).id)}
                        initialTags={[]}
                    >
                        <Button variant="outline" size="sm" className="h-8 bg-white border-blue-200 text-blue-700 hover:bg-blue-100 shadow-sm shrink-0">
                            <Tag className="mr-2 h-3.5 w-3.5" />
                            Gán Tags
                        </Button>
                    </ManageTagsDialog>

                    <div className="flex-1"></div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 shadow-sm shrink-0">
                                <Trash className="mr-2 h-3.5 w-3.5" />
                                Xóa tất cả
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Xóa {selectedRows.length} tài liệu?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteSelected} className="bg-red-600">
                                    Xóa ngay
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    )
}
