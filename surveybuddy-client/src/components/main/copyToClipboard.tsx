import { Link2 } from "lucide-react";
import React, { useState } from "react";

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy); // Copy to clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button onClick={handleCopy} area-label="Copy to clipboard">
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
