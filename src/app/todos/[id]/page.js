'use client';

import { useTodo } from '../../../context/TodoContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TodoDetail({ params }) {
    const router = useRouter();
    const { id } = params;
    const { getTodoById, deleteTodo } = useTodo();

    const todo = getTodoById(id);

    if (!todo) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold mb-4">タスクが見つかりません</h1>
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                  TODOリストに戻る
                </Link>
            </div>
        );
    }

    const handleDelete = () => {
        if (confirm('このタスク削除してもよろしいですか？')) {
            deleteTodo(id);
            router.push('/');
        }
    };

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">タスク詳細</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                    {todo.title}
                    <span className={`ml-2 text-sm px-2 py-1 rounded ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {todo.completed ? '完了' : '未完了'}
                    </span>
                </h2>
            </div>

            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">詳細:</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {todo.description || '詳細はありません'}
                </p>
            </div>

            <div className="flex space-x-2">
                <Link
                  href={`/todos/edit/${id}`}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  編集
                </Link>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  削除
                </button>
                <Link
                  href="/"
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    戻る
                </Link>
            </div>
        </div>
      </div>
    );
}
