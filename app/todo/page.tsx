'use client'
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import Sidebar from '../components/Sidebar';

export default function TodoPage() {
  const [newTodo, setNewTodo] = useState('');
  const [showState, setShowState] = useState(false);
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-grow flex justify-start p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">할일 목록</h1>
          
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add new todo"
            />
            <button
              onClick={handleAddTodo}
              className="mt-3 w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Todo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map(todo => (
              <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-2 h-5 w-5"
                  />
                  <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="w-full mt-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowState(!showState)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              {showState ? 'Zustand 상태 숨기기' : 'Zustand 상태 보기'}
            </button>
            
            {showState && (
              <pre className="mt-4 p-4 bg-white rounded-lg shadow-md overflow-auto">
                {JSON.stringify(todos, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
