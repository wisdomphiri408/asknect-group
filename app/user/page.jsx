"use client"
import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from Next.js
import UserQuestionCard from '@/components/UserQuestionCard';
import UserDocumentCard from "@/components/UserDocumentCard";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('questions');

  const questions = [
    {
      title: 'How to get started with Next.js?',
      answersCount: 5,
      views: 1200,
      postedDate: '2023-02-01T12:00:00Z'
    },
    {
      title: 'What is the difference between props and state in React?',
      answersCount: 0,
      views: 2500,
      postedDate: '2023-02-03T14:00:00Z'
    },
    // More questions...
  ];

  const documents = [
    {
      id: 1,
      title: "Understanding JavaScript Closures",
      views: 500,
      comments: 15,
      postedDate: "2024-02-01T12:00:00Z",
    },
    {
      id: 2,
      title: "React Best Practices",
      views: 1200,
      comments: 30,
      postedDate: "2024-01-20T10:30:00Z",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center dark:bg-gray-800 border-0 dark:text-white">
        <Image
          src="/assets/profile/channels4_profile (2).jpg"
          alt="User Avatar"
          width={96}
          height={96}
          className="rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold mt-2 dark:text-white">@Mike Namate</h2>
        <p className="text-gray-600 dark:text-white">Joined: Jan 2024</p>
        <div className="flex justify-center space-x-4 mt-2 dark:text-white">
          <span className="text-sm text-gray-500 ddark:text-gray-500">Questions: 10</span>
          <span className="text-sm text-gray-500 dark:text-gray-500">Answers: 25</span>
          <span className="text-sm text-gray-500 dark:text-gray-500">Followers: 100</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex sm:flex-row justify-center mt-4 space-y-2 sm:space-x-4 sm:space-y-0 border-b pb-2">
        {['questions', 'documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Extra Settings */}
      <div className="flex justify-between mt-6 text-sm text-blue-500">
        <button>⚙ Edit Profile</button>
        <button>💰 Earnings Dashboard</button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'questions' && (
          <div>
            {questions.map((question, index) => (
              <UserQuestionCard
                key={index}
                title={question.title}
                answersCount={question.answersCount}
                views={question.views}
                postedDate={question.postedDate}
              />
            ))}
          </div>
        )}
        {activeTab === 'documents' && (
          <div>📂  {documents.map((document) => (
            <UserDocumentCard 
              key={document.id} 
              document={document} 
            />
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
