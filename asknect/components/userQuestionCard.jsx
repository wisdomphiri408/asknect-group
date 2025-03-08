import React from 'react';

const UserQuestionCard = ({ title, answersCount, views, postedDate }) => {

  const handleUpdate = () => {
    // Logic for updating the question (maybe open a modal or redirect to an edit page)
    console.log('Update clicked');
  };

  const handleDelete = () => {
    // Logic for deleting the question (you can prompt a confirmation or directly delete)
    console.log('Delete clicked');
  };

  return (
    <div className="p-4 rounded-lg shadow-md hover:cursor-pointer transition-all mb-2 dark:bg-gray-800 border-0">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
      
      {/* Meta Information */}
      <div className="mt-2 text-gray-600 text-sm flex space-x-4 dark:text-gray-500">
        <span className="flex items-center ">
          {/* Answers Count */}
          <i className="fas fa-comments mr-1 "></i>
          {answersCount} answers
        </span>
        <span className="flex items-center">
          {/* Views Count */}
          <i className="fas fa-eye mr-1"></i>
          {views} views
        </span>
        <span className="flex items-center">
          {/* Posted Date */}
          <i className="fas fa-calendar-alt mr-1"></i>
          {new Date(postedDate).toLocaleDateString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        {/* Update Button (only visible if answersCount is 0) */}
        {answersCount === 0 && (
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
          >
            Update
          </button>
        )}
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserQuestionCard;
