import axios from 'axios';

export interface ExtractedReceiptData {
  vendor: string;
  date: string;
  total: string;
  tax: string;
  items: Array<{
    description: string;
    amount: string;
  }>;
  category: string;
}

// For MVP, we'll use a mock implementation
// Later, you can replace this with actual OCR API calls
export async function processReceiptImage(imageData: string): Promise<ExtractedReceiptData> {
  // Remove this mock delay in production
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // TODO: Replace with actual OCR API call
  // For example with Google Cloud Vision:
  /*
  const response = await axios.post(
    'https://vision.googleapis.com/v1/images:annotate',
    {
      requests: [
        {
          image: {
            content: imageData.split(',')[1], // Remove the data URL prefix
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
            },
          ],
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_CLOUD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  // Process OCR response to extract receipt data
  return processOcrResponse(response.data);
  */
  
  // Mock data for MVP development
  return {
    vendor: "Office Supplies Co.",
    date: "2025-03-10",
    total: "$127.42",
    tax: "$10.62",
    items: [
      { description: "Printer Paper", amount: "$45.99" },
      { description: "Ink Cartridges", amount: "$70.81" }
    ],
    category: "Office Supplies"
  };
}

// Helper function to process OCR response
function processOcrResponse(ocrResponse: any): ExtractedReceiptData {
  // This function would parse the OCR response and extract structured data
  // Implementation depends on the OCR service you choose
  // For now, return mock data
  return {
    vendor: "Office Supplies Co.",
    date: "2025-03-10",
    total: "$127.42",
    tax: "$10.62",
    items: [
      { description: "Printer Paper", amount: "$45.99" },
      { description: "Ink Cartridges", amount: "$70.81" }
    ],
    category: "Office Supplies"
  };
}