'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { signIn, signOut, getCurrentUser, signUp } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export default function TodoApp() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(true);
      setUserEmail(user.signInDetails?.loginId || '');
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    try {
      const { data: items } = await client.models.Todo.list();
      setTodos(items);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ username: email, password });
      await checkAuth();
    } catch (error: any) {
      alert(error.message || 'Sign in failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      alert('Sign up successful! Please check your email to verify your account.');
      setIsSignUp(false);
    } catch (error: any) {
      alert(error.message || 'Sign up failed');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setTodos([]);
      setUserEmail('');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const createTodo = async () => {
    if (!title.trim()) return;

    try {
      await client.models.Todo.create({
        title,
        description: description || undefined,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await client.models.Todo.update({
        id,
        completed: !completed,
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            📝 Todo App
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Built with Next.js & AWS Amplify Gen 2
          </p>

          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Sign Up</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition hover:from-purple-600 hover:to-pink-600"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-semibold text-purple-600 hover:text-purple-800"
                >
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition hover:from-purple-600 hover:to-pink-600"
              >
                Sign In
              </button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-purple-600 hover:text-purple-800"
                >
                  Sign Up
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">📝 My Todo App</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {userEmail}</span>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Add New Todo
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Todo title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createTodo()}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createTodo()}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <button
              onClick={createTodo}
              className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white transition hover:from-purple-600 hover:to-pink-600"
            >
              Add Todo
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Your Todos ({todos.length})
          </h2>
          {todos.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p className="text-lg">No todos yet. Add one above to get started! 🚀</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between rounded-lg border-2 p-4 transition ${
                    todo.completed
                      ? 'border-green-200 bg-green-50 opacity-75'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed || false}
                      onChange={() => toggleTodo(todo.id, todo.completed || false)}
                      className="h-5 w-5 cursor-pointer rounded border-gray-300 text-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          todo.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-800'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {todo.description}
                        </p>
                      )}
                      {todo.createdAt && (
                        <small className="mt-1 block text-xs text-gray-400">
                          Created: {new Date(todo.createdAt).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-4 rounded p-2 text-red-500 transition hover:bg-red-50"
                    aria-label="Delete todo"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

