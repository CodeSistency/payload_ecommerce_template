"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies for session management
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // On successful registration, redirect to login
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-secondaryDark p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary dark:text-primaryDark mb-6 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary dark:text-secondaryDark"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-secondary dark:border-secondaryDark rounded-md text-secondary dark:text-secondaryDark bg-white dark:bg-gray-800 focus:ring-primary dark:focus:ring-primaryDark focus:border-primary dark:focus:border-primaryDark"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-secondary dark:text-secondaryDark"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-secondary dark:border-secondaryDark rounded-md text-secondary dark:text-secondaryDark bg-white dark:bg-gray-800 focus:ring-primary dark:focus:ring-primaryDark focus:border-primary dark:focus:border-primaryDark"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary dark:bg-primaryDark hover:bg-blue-600 dark:hover:bg-blue-800'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-secondary dark:text-secondaryDark">
          Already have an account?{' '}
          <Link href="/login" className="text-primary dark:text-primaryDark hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;