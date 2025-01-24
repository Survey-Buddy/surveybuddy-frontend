import { Link2 } from "lucide-react";
import React, { useState } from "react";

// Define structure of the props for CopyToClipBoard component
interface CopyToClipboardProps {
  textToCopy: string;
}

// Component to copy survey link to clipboard

export const CopyToClipboard = ({ textToCopy }: CopyToClipboardProps) => {
  // State to track if text has been copied successfully
  const [copied, setCopied] = useState(false);

  // Function to handle copy to clipboard
  const handleCopy = async () => {
    try {
      // Copy text to clipboard
      await navigator.clipboard.writeText(textToCopy);
      // Set copied state to true
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleCopy} aria-label="Copy to clipboard">
        {/* Change icon color based on state if text is copied */}
        {copied ? (
          <Link2 className="w-6 h-6 text-green-500" />
        ) : (
          <Link2 className="w-6 h-6 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default CopyToClipboard;
