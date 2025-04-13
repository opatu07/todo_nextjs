'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTodo } from '../context/TodoContext';

export default function TodoItem({ todo }) {
    const { toggleComplete, deleteTodo } = useTodo();
    const [isDeleteing, setIsDeleteing] = useState(false);

    const handleDelete = () => {
        if (isDeleting) {
            deleteTodo(todo.id);
            setIsDeleting(false);
        } else {
            setIsDeleting(true);
        }
    };

    return (
        <div className="border p-4 my-2 rounded-md bg-white shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span
                      className={`ml-2 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                        {todo.title}
                    </span>
                </div>
                
                <div className="flex space-x-2">
                    <Link
                      href={`/todos/${todo.id}`}
                      className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                        詳細
                    </Link>
                    <button
                      onClick={handleDelete}
                      className={`py-1 px-3 ${isDeleting ? 'bg-red-600' : 'bg-red-500'} text-white rounded hover:bg-red-600 text-sm`}
                    >
                        {isDeleting ? '確認' : '削除'}
                    </button>
                </div>
            </div>
            {todo.description && (
                <p className="mt-2 text-gray-600 text-sm">{todo.description}</p>
            )}
        </div>
    );
}
