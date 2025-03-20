import Image from "next/image";
import ActionButtons from "@/components/QaActionButtons";
import Link from "next/link";

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white rounded-lg p-0 w-full dark:bg-gray-800">
      {/* User Info */}
      <Link href={`/qa/posts/${question.slug}`}>
      <div className="userInfo flex items-center border-b pb-3 pl-4">
        <Image
          src={question.profileImg}
          alt="User Profile"
          width={37}
          height={37}
          className="rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold dark:text-gray-100">{question.username}</h2>
          <p className="text-sm text-gray-500 small-text">
            Answers: {question.answers} | Views: {question.views}
          </p>
        </div>
      </div>
      </Link>

      {/* Question Content */}
      <div className="mt-3">
      <Link href={`/qa/posts/${question.slug}`}>
        <h3 className="text-xl font-semibold dark:text-gray-100 pl-4">{question.questionTitle}</h3>
        <p className="text-gray-600 dark:text-gray-300 pl-4">{question.questionDescription}</p>

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
        </Link>

        {/* Action Buttons */}
        <ActionButtons question={question} />
      </div>
    </div>
  );
};

export default QuestionCard;