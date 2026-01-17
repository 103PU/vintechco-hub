# VINTECHCO Process Hub

![Vintechco Logo](public/window.svg)

**Hệ thống quản lý quy trình kỹ thuật, tài liệu, và nhân sự chuyên nghiệp dành cho VINTECHCO.**

## 📖 Giới thiệu (Overview)
VINTECHCO Hub là ứng dụng Enterprise-grade giúp số hóa quy trình làm việc:
- **Quản lý tập trung**: Tài liệu, quy trình, báo cáo.
- **Chuẩn hóa**: Biến file tĩnh thành checklist tương tác.
- **Phân quyền**: RBAC chặt chẽ (Admin/Technician).

## 🚀 Bắt đầu nhanh (Quick Start)

### Yêu cầu (Prerequisites)
- Node.js 18+
- Docker (cho PostgreSQL)

### Cài đặt (Installation)
```bash
git clone <repo_url>
cd vintechco-hub
npm install
docker-compose up -d  # Start Database
npx prisma migrate dev # Run migrations
npm run dev           # Start Server
```
Truy cập: `http://localhost:3000`

## 📚 Tài liệu chi tiết (Documentation)

Dự án được tài liệu hóa thành 2 tệp chính (ngoài README này):

### 1. [Kiến trúc & Hệ thống (ARCHITECTURE.md)](Docs/ARCHITECTURE.md)
- **Tech Stack**: Next.js 16, TypeScript, Prisma, NextAuth.
- **Design System**: Feature-based architecture.
- **Security**: RBAC, Authentication flows.
- **Data Flow**: Sơ đồ dữ liệu và API standards.

### 2. [Vận hành & Phát triển (MAINTENANCE.md)](Docs/MAINTENANCE.md)
- **Development**: Hướng dẫn đóng góp code (Coding Standards).
- **Testing**: Chiến lược kiểm thử (TDD, E2E).
- **Deployment**: Checklist deploy production.
- **Scripts**: Các lệnh quản trị (`db:seed`, `import:data`).

## 🛡️ Core Mandates
Tất cả đóng góp **BẮT BUỘC** tuân thủ các quy tắc trong `.agent/rules/`:
1.  **[CORE_RULES.md](.agent/rules/CORE_RULES.md)**: Security & Business Logic.
2.  **[CODING_STANDARDS.md](.agent/rules/CODING_STANDARDS.md)**: Code style & structure.
3.  **[WORKFLOW_PROTOCOLS.md](.agent/rules/WORKFLOW_PROTOCOLS.md)**: Git & QA process.

## 📝 License
VINTECHCO Internal Use Only.
