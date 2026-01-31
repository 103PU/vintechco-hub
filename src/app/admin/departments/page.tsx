
import { getDepartments } from '@/app/actions/admin-departments';
import { DepartmentClientWrapper } from './client-wrapper';

export default async function DepartmentsPage() {
    const departments = await getDepartments();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Quản lý Phòng Ban (Cost Center)</h1>
            <DepartmentClientWrapper initialData={departments} />
        </div>
    );
}

