import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            const path = req.nextUrl.pathname;

            // Admin routes require authentication
            if (path.startsWith("/admin")) {
                return !!token;
            }

            // Default: Allow
            return true;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*"],
};
