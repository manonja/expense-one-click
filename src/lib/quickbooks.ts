import axios from 'axios';
import { ExtractedReceiptData } from './ocr';

// Interface for QuickBooks expense data
export interface QuickBooksExpense {
  TxnDate: string;
  PrivateNote: string;
  Line: Array<{
    DetailType: string;
    Amount: number;
    Description: string;
    AccountBasedExpenseLineDetail: {
      AccountRef: {
        value: string;
      };
      TaxCodeRef?: {
        value: string;
      };
    };
  }>;
  VendorRef?: {
    value: string;
    name: string;
  };
}

// For MVP, we'll use a mock implementation
// Later, you can replace this with actual QuickBooks API calls
export async function sendToQuickBooks(receiptData: ExtractedReceiptData): Promise<{ success: boolean, message: string }> {
  // Remove this mock delay in production
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // TODO: Replace with actual QuickBooks API call
    // Example implementation:
    /*
    // Format data for QuickBooks API
    const expenseData: QuickBooksExpense = {
      TxnDate: receiptData.date,
      PrivateNote: `Receipt from ${receiptData.vendor}`,
      Line: receiptData.items.map(item => ({
        DetailType: "AccountBasedExpenseLineDetail",
        Amount: parseFloat(item.amount.replace('$', '')),
        Description: item.description,
        AccountBasedExpenseLineDetail: {
          AccountRef: {
            value: "42" // Account ID for the expense category
          },
          TaxCodeRef: {
            value: "TAX" // Tax code reference
          }
        }
      })),
      VendorRef: {
        value: "123", // Vendor ID in QuickBooks
        name: receiptData.vendor
      }
    };

    const response = await axios.post(
      'https://quickbooks.api.intuit.com/v3/company/COMPANY_ID/purchase',
      expenseData,
      {
        headers: {
          Authorization: `Bearer ${process.env.QUICKBOOKS_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.status === 200) {
      return { success: true, message: "Receipt successfully added to QuickBooks!" };
    } else {
      return { success: false, message: "Error adding to QuickBooks. Please try again." };
    }
    */
    
    // Mock successful response for MVP
    return { 
      success: true, 
      message: "Receipt successfully added to QuickBooks!" 
    };
  } catch (error) {
    console.error("QuickBooks API error:", error);
    return { 
      success: false, 
      message: "Error adding to QuickBooks. Please try again." 
    };
  }
}