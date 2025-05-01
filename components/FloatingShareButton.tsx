import React, { useState } from 'react';
import ShareButtons from './ShareButtons';

interface FloatingShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

const FloatingShareButton: React.FC<FloatingShareButtonProps> = ({ url, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShare = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-2 right-2 z-50 md:hidden">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-1.5 mb-1.5 animate-fade-in">
          <ShareButtons
            url={url}
            title={title}
            description={description}
            iconSize={24}
            className="flex-wrap justify-center"
          />
          <button
            onClick={toggleShare}
            className="mt-0.5 text-xs text-gray-500 w-full text-center"
          >
            Close
          </button>
        </div>
      )}

      <button
        onClick={toggleShare}
        className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
        aria-label="Share"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
    </div>
  );
};

export default FloatingShareButton;
