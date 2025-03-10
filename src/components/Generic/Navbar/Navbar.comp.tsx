// app/components/Generic/Navbar.tsx
import { useDarkMode } from "@/lib/utils/hooks/useDarkMode";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-primary dark:bg-primaryDark text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Store</Link>
        <div className="space-x-4">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <button
            onClick={toggleDarkMode}
            className="bg-secondary dark:bg-secondaryDark px-2 py-1 rounded"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};