import Link from "next/link"
import { FileText } from "lucide-react"

const documents = [
  { id: 1, title: "Calculus Cheat Sheet", downloads: 2500 },
  { id: 2, title: "Python Programming Guide", downloads: 1800 },
  { id: 3, title: "History Timeline: World War II", downloads: 2100 },
]

export default function PopularDocuments() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl dark:text-white font-semibold mb-4">Popular Documents</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
          >
            <FileText className="h-6 w-6 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{doc.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{doc.downloads} downloads</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/documents" className="block text-center text-indigo-600 dark:text-indigo-400 hover:underline mt-4">
        View all documents
      </Link>
    </div>
  )
}

