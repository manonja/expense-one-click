/**
 * Types for OCR API
 */

export interface OcrRequest {
  /**
   * Base64 encoded image data
   */
  imageData: string;
}

export interface OcrResponse {
  /**
   * Whether the OCR processing was successful
   */
  success: boolean;
  
  /**
   * Extracted data from the receipt (only present if success is true)
   */
  data?: {
    /**
     * Merchant/vendor name
     */
    merchant?: string;
    
    /**
     * Total amount on the receipt
     */
    total?: number;
    
    /**
     * Date of the transaction
     */
    date?: string;
    
    /**
     * List of items on the receipt
     */
    items?: Array<{
      description?: string;
      amount?: number;
      quantity?: number;
    }>;
    
    /**
     * Any additional extracted information
     */
    [key: string]: unknown;
  };
  
  /**
   * Error message (only present if success is false)
   */
  error?: string;
}

/**
 * Extracted receipt data structure
 */
export interface ExtractedReceiptData {
  /**
   * Vendor/merchant name
   */
  vendor: string;
  
  /**
   * Total amount on the receipt
   */
  total?: number;
  
  /**
   * Tax amount
   */
  tax: number;
  
  /**
   * Expense category
   */
  category: string;
  
  /**
   * Date of the transaction
   */
  date?: string;
  
  /**
   * List of items on the receipt
   */
  items?: Array<{
    description?: string;
    amount?: number;
    quantity?: number;
  }>;
  
  /**
   * Any additional information
   */
  [key: string]: unknown;
}

/**
 * Types for QuickBooks API
 */

export interface QuickBooksRequest {
  /**
   * Receipt data to be sent to QuickBooks
   */
  receiptData: ExtractedReceiptData;
  
  /**
   * QuickBooks account information
   */
  accountInfo?: {
    /**
     * QuickBooks company ID
     */
    companyId?: string;
    
    /**
     * Other account-related information
     */
    [key: string]: unknown;
  };
}

export interface QuickBooksResponse {
  /**
   * Whether the QuickBooks operation was successful
   */
  success: boolean;
  
  /**
   * Response data from QuickBooks (only present if success is true)
   */
  data?: {
    /**
     * QuickBooks transaction ID
     */
    transactionId?: string;
    
    /**
     * URL to view the receipt in QuickBooks
     */
    receiptUrl?: string;
    
    /**
     * Other response data
     */
    [key: string]: unknown;
  };
  
  /**
   * Error message (only present if success is false)
   */
  error?: string;
}
