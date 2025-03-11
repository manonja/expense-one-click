import { NextRequest, NextResponse } from 'next/server';
import { sendToQuickBooks } from '@/lib/quickbooks';
import { QuickBooksRequest, QuickBooksResponse } from '@/types';
import { ExtractedReceiptData as OcrExtractedReceiptData } from '@/lib/ocr';

/**
 * Converts our type to the OCR library's ExtractedReceiptData type
 */
function convertToOcrReceiptData(data: QuickBooksRequest['receiptData']): OcrExtractedReceiptData {
  return {
    vendor: data.vendor,
    date: data.date || new Date().toISOString().split('T')[0],
    total: data.total?.toString() || '0',
    tax: data.tax.toString(),
    category: data.category,
    items: data.items?.map(item => ({
      description: item.description || '',
      amount: item.amount?.toString() || '0'
    })) || []
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: QuickBooksRequest = await request.json();
    
    if (!body.receiptData) {
      return NextResponse.json<QuickBooksResponse>(
        { success: false, error: 'No receipt data provided' },
        { status: 400 }
      );
    }

    // Validate required fields
    const { vendor, tax, category } = body.receiptData;
    if (!vendor || tax === undefined || !category) {
      return NextResponse.json<QuickBooksResponse>(
        { success: false, error: 'Missing required receipt data fields (vendor, tax, or category)' },
        { status: 400 }
      );
    }

    // Convert to OCR library's type and send to QuickBooks
    const ocrReceiptData = convertToOcrReceiptData(body.receiptData);
    const result = await sendToQuickBooks(ocrReceiptData);
    
    // Convert result to match our QuickBooksResponse type
    const response: QuickBooksResponse = {
      success: result.success,
      error: result.success ? undefined : result.message
    };
    
    if (result.success) {
      response.data = {
        transactionId: '123', // Mock ID
        receiptUrl: 'https://quickbooks.intuit.com/app/receipts/123' // Mock URL
      };
    }
    
    // Return the result
    return NextResponse.json<QuickBooksResponse>(
      response,
      { status: result.success ? 200 : 400 }
    );
  } catch (error) {
    console.error('QuickBooks API error:', error);
    
    return NextResponse.json<QuickBooksResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send to QuickBooks' 
      },
      { status: 500 }
    );
  }
}