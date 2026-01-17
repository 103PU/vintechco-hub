import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center p-8">
                <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Không có quyền truy cập
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                </p>
                <div className="space-x-4">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Về trang chủ
                    </Link>
                    <Link
                        href="/api/auth/signout"
                        className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </div>
    );
}
