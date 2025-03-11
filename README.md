# Expenses In One Pic

### Project Structure
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ocr/
│   │   │   │   └── route.ts           # OCR API route
│   │   │   └── quickbooks/
│   │   │       └── route.ts           # QuickBooks API route
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Dashboard page
│   │   ├── scan/
│   │   │   └── page.tsx               # Receipt scanning page
│   │   ├── layout.tsx                 # Root layout (created by Next.js)
│   │   └── page.tsx                   # Landing page (created by Next.js)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx             # Reusable button component
│   │   │   └── card.tsx               # Reusable card component
│   │   ├── CameraCapture.tsx          # Camera functionality component
│   │   ├── ReceiptForm.tsx            # Receipt data editing form
│   │   └── ReceiptPreview.tsx         # Displays extracted receipt data
│   ├── lib/
│   │   ├── ocr.ts                     # OCR service integration
│   │   └── quickbooks.ts              # QuickBooks API integration
│   └── types/
│       └── index.ts                   # TypeScript type definitions
├── public/
│   └── ...                            # Static assets
└── package.json