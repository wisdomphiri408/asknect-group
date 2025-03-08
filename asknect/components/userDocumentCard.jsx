import React from "react";
import { FileText, Eye, Pencil,Trash } from "lucide-react";

const UserDocumentCard = ({ document}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full flex flex-col  md:flex-row items-center justify-between">
      {/* Document Info */}
      <div className="flex items-center space-x-4">
        <FileText className="text-blue-500 w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{document.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {document.views} views • {document.comments} comments
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Posted on: {new Date(document.postedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button 
          className="p-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
        >
          <Eye className="w-4 h-4 mr-1" /> View
        </button>
        <button 
          className="p-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <Pencil className="w-4 h-4 mr-1" /> Update
        </button>
        <button 
          className="p-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
        >
          <Trash className="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default UserDocumentCard;
