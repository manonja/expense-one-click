'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import { processReceiptImage, ExtractedReceiptData } from '@/lib/ocr';
import { sendToQuickBooks } from '@/lib/quickbooks';

export default function ScanPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedReceiptData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageCaptured = async (imageData: string) => {
    setCapturedImage(imageData);
    setError(null);
    setIsProcessing(true);
    
    try {
      const data = await processReceiptImage(imageData);
      setExtractedData(data);
    } catch (err) {
      setError("Failed to process receipt. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitToQuickBooks = async () => {
    if (!extractedData) return;
    
    setIsProcessing(true);
    try {
      const result = await sendToQuickBooks(extractedData);
      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send to QuickBooks. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setExtractedData(null);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <main className="w-full max-w-md mx-auto p-3 sm:p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">QuickBooks Receipt Scanner</h1>
      
      {!capturedImage && !successMessage && (
        <CameraCapture onImageCaptured={handleImageCaptured} />
      )}
      
      {isProcessing && (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8">
          <Loader className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 animate-spin mb-3 sm:mb-4" />
          <p className="text-gray-600 text-sm sm:text-base">Processing your receipt...</p>
        </div>
      )}
      
      {capturedImage && !isProcessing && !successMessage && (
        <div>
          <div className="mb-4">
            <img 
              src={capturedImage} 
              alt="Captured Receipt" 
              className="w-full rounded-lg border border-gray-200" 
            />
          </div>
          
          {extractedData && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Extracted Information</h2>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                  <div className="text-gray-700 font-medium">Vendor:</div>
                  <div className="sm:col-start-2 text-gray-800">{extractedData.vendor}</div>
                  
                  <div className="text-gray-700 font-medium">Date:</div>
                  <div className="sm:col-start-2 text-gray-800">{extractedData.date}</div>
                  
                  <div className="text-gray-700 font-medium">Total:</div>
                  <div className="sm:col-start-2 text-gray-800">{extractedData.total}</div>
                  
                  <div className="text-gray-700 font-medium">Tax:</div>
                  <div className="sm:col-start-2 text-gray-800">{extractedData.tax}</div>
                  
                  <div className="text-gray-700 font-medium">Category:</div>
                  <div className="sm:col-start-2 text-gray-800">{extractedData.category}</div>
                </div>
                
                <div className="mt-4">
                  <div className="text-gray-700 font-medium mb-1">Items:</div>
                  <ul className="list-disc pl-5 text-gray-800">
                    {extractedData.items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.description} - {item.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={handleSubmitToQuickBooks}
                  className="w-full sm:flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 text-sm sm:text-base"
                >
                  Send to QuickBooks
                </button>
                <button 
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-4 flex items-start gap-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
      
      {successMessage && !isProcessing && (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-3 sm:mb-4" />
          <p className="text-green-700 font-medium mb-4 text-center text-sm sm:text-base">{successMessage}</p>
          <button 
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            Scan Another Receipt
          </button>
        </div>
      )}
    </main>
  );
}