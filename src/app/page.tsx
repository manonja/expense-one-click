import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 bg-gray-50">
      <main className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
          QuickBooks Receipt Scanner
        </h1>
        
        <p className="text-base sm:text-lg text-center mb-6 sm:mb-8 text-gray-600">
          Simplify your expense tracking by scanning receipts directly into QuickBooks
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex-1 border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">Scan Receipts</h2>
            <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
              Take a photo of your receipt or upload an existing image.
            </p>
          </div>
          
          <div className="flex-1 border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">Extract Data</h2>
            <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
              Our app automatically extracts vendor, date, items, and costs.
            </p>
          </div>
          
          <div className="flex-1 border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">Upload to QuickBooks</h2>
            <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
              Send the data directly to your QuickBooks account with one click.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/scan" 
            className="px-8 py-3 bg-indigo-600 text-white font-medium text-lg rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            Start Scanning
          </Link>
        </div>
      </main>
    </div>
  );
}