import Image from "next/image"; // Import Image from Next.js
import { ThumbsUp, ThumbsDown, MessageSquare, UserPlus } from "lucide-react"; // Import Lucide icons

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white rounded-lg p-0 w-full dark:bg-gray-800">
      {/* User Info */}
      <div className="userInfo flex items-center border-b pb-3 pl-4">
        <Image
          src={question.profileImg}
          alt="User Profile"
          width={37}
          height={37}
          className="rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold dark:text-white">{question.username}</h2>
          <p className="text-sm text-gray-500 small-text">
            Answers: {question.answers} | Views: {question.views}
          </p>
        </div>
      </div>

      {/* Question Content */}
      <div className="mt-3">
        <h3 className="text-xl font-semibold dark:text-white pl-4">{question.questionTitle}</h3>
        <p className="text-gray-600 dark:text-white pl-4">{question.questionDescription}</p>

        {/* Conditionally Render Image if Available */}
        {question.picture && (
          <div className="mt-3">
            <Image
              src={question.picture}
              alt="Question Image"
              layout="responsive"
              width={16}
              height={9}
              className="min-h-[250px] sm:min-h-[350px] md:min-h-[450px]"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 px-4 pb-3">
          {/* Upvote Button */}
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            <ThumbsUp className="w-5 h-5 mr-1" /> {question.likes                 }
          </button>

          {/* Downvote Button */}
          <button className="flex items-center text-gray-500 hover:text-red-500">
            <ThumbsDown className="w-5 h-5 mr-1" /> 
          </button>

          {/* Answers Button */}
          <button className="flex items-center text-gray-500 hover:text-green-500">
            <MessageSquare className="w-5 h-5 mr-1" /> {question.answers}
          </button>

          {/* Follow Button */}
          <button className="flex items-center text-gray-500 hover:text-yellow-500">
            <UserPlus className="w-5 h-5 mr-1" /> Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
