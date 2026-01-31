import { Suspense } from 'react';
// SearchForm and AuthButton are now inside Header
import DocumentFlow from '@/components/DocumentFlow'; // The new client component
import { getDocumentsForHome } from '@/features/documents/actions'; // Import server action
import { Header } from '@/components/layout/Header';

// A simple loading skeleton for the main content
function MainContentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white/50 p-6 rounded-xl shadow-sm border">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="@container">
            <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg hidden @md:block"></div>
              <div className="h-20 bg-gray-200 rounded-lg hidden @lg:block"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default async function HomePage() {
  // Prefetch data on the server
  const initialDocuments = await getDocumentsForHome();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* DocumentFlow handles its own data fetching and loading states */}
        <Suspense fallback={<MainContentSkeleton />}>
          <DocumentFlow initialDocuments={initialDocuments} />
        </Suspense>
      </main>
    </div>
  );
}
