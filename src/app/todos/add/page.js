import TodoForm from '../../../components/TodoForm';

export default function AddTodo() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">新規タスク追加</h1>
            <TodoForm />
        </div>
    );
}
