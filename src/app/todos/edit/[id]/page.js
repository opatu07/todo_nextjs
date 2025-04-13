'use client';

import TodoForm from '../../../../components/TodoForm';

export default function EditTodo({ params }) {
    const { id } = params;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">タスク編集</h1>
            <TodoForm todoId={id} isEditing={true} />
        </div>
    );
}
