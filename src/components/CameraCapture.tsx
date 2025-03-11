'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload } from 'lucide-react';
import ReactWebcam from 'react-webcam';

interface CameraCaptureProps {
  onImageCaptured: (imageData: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef<ReactWebcam>(null);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onImageCaptured(imageSrc);
        setIsCameraActive(false);
      }
    }
  }, [webcamRef, onImageCaptured]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageCaptured(result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isCameraActive) {
    return (
      <div className="flex flex-col items-center w-full">
        <ReactWebcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }}
          className="w-full rounded-lg"
        />
        <div className="mt-4 flex flex-col sm:flex-row w-full gap-3">
          <button
            onClick={captureImage}
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            Capture Receipt
          </button>
          <button
            onClick={() => setIsCameraActive(false)}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 w-full">
      <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
      <p className="mb-4 text-center text-gray-600 text-sm sm:text-base">Take a photo of your receipt or upload an existing one</p>
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 px-2">
        <button
          onClick={() => setIsCameraActive(true)}
          className="w-full sm:flex-1 px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Camera size={16} />
          <span>Take Photo</span>
        </button>
        
        <label className="w-full sm:flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 flex items-center justify-center gap-2 text-sm sm:text-base">
          <Upload size={16} />
          <span>Upload</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </label>
      </div>
    </div>
  );
};

export default CameraCapture;