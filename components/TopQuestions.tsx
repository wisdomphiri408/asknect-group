import Link from "next/link"
import { MessageCircle } from "lucide-react"

const questions = [
  { id: 1, title: "How do I implement a binary search tree in Java?", answers: 5 },
  { id: 2, title: "What are the key differences between React and Vue?", answers: 8 },
  { id: 3, title: "Can someone explain the concept of quantum entanglement?", answers: 3 },
]

export default function TopQuestions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl dark:text-white font-semibold mb-4">Top Questions</h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <Link
            key={question.id}
            href={`/qa/${question.id}`}
            className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
          >
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{question.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{question.answers} answers</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/qa" className="block text-center text-indigo-600 dark:text-indigo-400 hover:underline mt-4">
        View all questions
      </Link>
    </div>
  )
}

