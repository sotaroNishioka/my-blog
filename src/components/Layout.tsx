import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center text-gray-900 font-bold text-xl"
              >
                My Blog
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white shadow mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} My Blog. Built with Next.js and
            TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}
