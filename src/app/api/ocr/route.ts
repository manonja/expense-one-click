import { NextRequest, NextResponse } from 'next/server';
import { processReceiptImage, ExtractedReceiptData as OcrExtractedReceiptData } from '@/lib/ocr';
import { OcrRequest, OcrResponse } from '@/types';

/**
 * Converts OCR library data to our API response format
 */
function convertOcrData(ocrData: OcrExtractedReceiptData): OcrResponse['data'] {
  return {
    merchant: ocrData.vendor,
    total: parseFloat(ocrData.total.replace(/[^0-9.]/g, '')),
    date: ocrData.date,
    items: ocrData.items.map(item => ({
      description: item.description,
      amount: parseFloat(item.amount.replace(/[^0-9.]/g, '')),
    })),
    // Additional fields from OCR
    tax: parseFloat(ocrData.tax.replace(/[^0-9.]/g, '')),
    category: ocrData.category
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: OcrRequest = await request.json();
    
    if (!body.imageData) {
      return NextResponse.json<OcrResponse>(
        { success: false, error: 'No image data provided' },
        { status: 400 }
      );
    }

    // Process the receipt image
    const ocrData = await processReceiptImage(body.imageData);
    
    // Convert to our API format
    const data = convertOcrData(ocrData);
    
    // Return the extracted data
    return NextResponse.json<OcrResponse>(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('OCR processing error:', error);
    
    return NextResponse.json<OcrResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process receipt' 
      },
      { status: 500 }
    );
  }
}