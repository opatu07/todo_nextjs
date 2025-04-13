'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTodo } from '../context/TodoContext';

export default function TodoForm({ todoId, isEditing = false }) {
    const router = useRouter();
    const { addTodo, getTodoById, updateTodo } = useTodo();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        if (isEditing && todoId) {
            const todo = getTodoById(todoId);
            if (todo) {
                setFormData({
                    title: todo.title,
                    description: todo.description
                });
            }
        }
    }, [isEditing, todoId, getTodoById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('タイトルを入力してください');
            return;
        }

        if (isEditing) {
            updateTodo(todoId, formData);
        } else {
            addTodo(formData);
        }

        setFormData({ title: '', description: '' });
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    タイトル
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="タスクのタイトル"
                  required 
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    詳細
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="タスクの詳細"
                />
            </div>
            <div className="flex justify-between">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isEditing ? '更新' : '追加'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    キャンセル
                </button>
            </div>
        </form>
    );
}
