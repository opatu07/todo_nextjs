'use client';

import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import Link from 'next/link';

export default function TodoList() {
    const { todos } = useTodo();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">TODOリスト</h1>
                <Link
                  href="/todos/add"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    新規追加
                </Link>
            </div>

            {todos.length === 0 ? (
              <p className="text-center text-gray-500 my-4">タスクがありません。新しいタスクを追加してください。</p>
            ) : (
              <div className="space-y-2">
                {todos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            )} 
        </div>
    );
}
