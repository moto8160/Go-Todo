'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:8080/todos');
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleCreate = async () => {
    if (newTodo.trim() === '') {
      alert('Todoの内容を入力してください');
      return;
    }

    const res = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo }),
    });

    if (!res.ok) {
      alert('作成に失敗しました');
      return;
    }

    const createdTodo = await res.json();

    setNewTodo('');
    // window.location.reload();
    setTodos((prev) => [...prev, createdTodo]);
  };

  const handleUpdate = async (id: number) => {
    const res = await fetch(`http://localhost:8080/todos/${id}/completed`, {
      method: 'PATCH',
    });

    if (!res.ok) {
      alert('更新に失敗しました');
      return;
    }

    // window.location.reload();
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo)));
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      alert('削除に失敗しました');
      return;
    }

    // window.location.reload();
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className=" bg-black min-h-screen">
      <div className="p-6 max-w-2xl mx-auto text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">📋 Todo List</h1>

        <input
          type="text"
          className="bg-white text-black rounded-lg p-2 mb-4 w-full"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="px-4 py-2 mb-6 rounded-lg bg-sky-400 hover:bg-sky-600"
        >
          追加
        </button>

        {/* Todo一覧 */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-xl"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="w-5 h-5 mr-4 accent-green-600"
                />
                <span className="text-lg font-medium text-white">{todo.title}</span>
              </div>
              <div className="gap-3 flex">
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="p-1 text-black rounded-lg text-sm bg-gray-200 hover:bg-gray-400"
                >
                  完了
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="p-1 text-black rounded-lg text-sm bg-gray-200 hover:bg-gray-400"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
