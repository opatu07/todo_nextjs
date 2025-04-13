'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        } else {
            const initialTodos = [
                { id: '1', title: '初期データ1', description: '内容1', completed: false},
                { id: '2', title: '初期データ2', description: '内容2', completed: false},
            ];
            setTodos(initialTodos);
            localStorage.setItem('todos', JSON.stringify(initialTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (todo) => {
        const newTodo = {
            id: Date.now().toString(),
            ...todo,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const getTodoById = (id) => {
        return todos.find(todo => todo.id === id);
    };

    return (
        <TodoContext.Provider value={{
            todos,
            addTodo,
            deleteTodo,
            updateTodo,
            toggleComplete,
            getTodoById
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodo() {
    return useContext(TodoContext);
}
