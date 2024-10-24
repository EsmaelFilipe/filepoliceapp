// components/auth/layout/AuthLayout.js

export default function AuthLayout({ children }) {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 space-y-8 bg-white shadow-md rounded-lg">
        {children}
      </div>
    </main>
  );
}
