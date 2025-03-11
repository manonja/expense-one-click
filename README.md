# QuickBooks Receipt Scanner

A modern web application that allows users to scan receipts with their device camera and automatically upload them to QuickBooks for expense tracking and accounting.

![QuickBooks Receipt Scanner](/public/Screenshot%202025-03-11%20at%2014.55.14.png)

## 📋 Table of Contents

- [QuickBooks Receipt Scanner](#quickbooks-receipt-scanner)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [📥 Installation](#-installation)
  - [🚀 Usage](#-usage)
  - [📁 Project Structure](#-project-structure)
  - [📚 API Documentation](#-api-documentation)
    - [OCR API](#ocr-api)
    - [QuickBooks API](#quickbooks-api)
  - [🚦 Development Status](#-development-status)
  - [📝 Next Steps](#-next-steps)
  - [📄 License](#-license)

## ✨ Features

- **Receipt Scanning**: Capture receipts using your device's camera
- **OCR Processing**: Extract key information from receipts (vendor, date, amount, items)
- **QuickBooks Integration**: Automatically upload receipt data to QuickBooks
- **Mobile-Friendly**: Responsive design optimized for all devices
- **User Dashboard**: View and manage scanned receipts

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **OCR**: (Currently mocked, ready for integration with Google Cloud Vision or Microsoft Azure OCR)
- **QuickBooks API**: (Currently mocked, ready for integration with QuickBooks API)
- **Styling**: Tailwind CSS v4

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quickbooks-receipt-scanner.git
   cd quickbooks-receipt-scanner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your API keys and configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click on "Scan Receipt" to access the camera interface
3. Capture a clear image of your receipt
4. Review the extracted information
5. Click "Send to QuickBooks" to upload the receipt data

## 📁 Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── ocr/          # OCR processing endpoint
│   │   └── quickbooks/   # QuickBooks integration endpoint
│   ├── dashboard/        # Dashboard page
│   ├── scan/             # Receipt scanning page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
│   └── CameraCapture.tsx # Camera interface component
├── lib/                  # Utility functions and services
│   ├── ocr.ts            # OCR processing service
│   └── quickbooks.ts     # QuickBooks integration service
└── types/                # TypeScript type definitions
    └── index.ts          # Shared type definitions
```

## 📚 API Documentation

### OCR API

**Endpoint**: `/api/ocr`
**Method**: POST
**Request Body**:
```json
{
  "imageData": "base64-encoded-image-data"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "merchant": "Office Supplies Co.",
    "total": 127.42,
    "date": "2025-03-10",
    "items": [
      { "description": "Printer Paper", "amount": 45.99 },
      { "description": "Ink Cartridges", "amount": 70.81 }
    ],
    "tax": 10.62,
    "category": "Office Supplies"
  }
}
```

### QuickBooks API

**Endpoint**: `/api/quickbooks`
**Method**: POST
**Request Body**:
```json
{
  "receiptData": {
    "vendor": "Office Supplies Co.",
    "total": 127.42,
    "date": "2025-03-10",
    "tax": 10.62,
    "category": "Office Supplies",
    "items": [
      { "description": "Printer Paper", "amount": 45.99 },
      { "description": "Ink Cartridges", "amount": 70.81 }
    ]
  }
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "transactionId": "123",
    "receiptUrl": "https://quickbooks.intuit.com/app/receipts/123"
  }
}
```

## 🚦 Development Status

This project is currently in MVP (Minimum Viable Product) stage. The core functionality is implemented with mock services for OCR and QuickBooks integration. The application is ready for real-world integration with these services.

## 📝 Next Steps

- [ ] Integrate with a real OCR service (Google Cloud Vision or Microsoft Azure OCR)
- [ ] Set up QuickBooks developer account and obtain API credentials
- [ ] Implement OAuth flow for QuickBooks authentication
- [ ] Add user authentication and account management
- [ ] Enhance dashboard with receipt history and search functionality
- [ ] Implement receipt categorization and tagging
- [ ] Add expense reporting and analytics features
- [ ] Set up automated testing for critical components
- [ ] Deploy to production environment
- [ ] Implement continuous integration/continuous deployment (CI/CD)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by Manon