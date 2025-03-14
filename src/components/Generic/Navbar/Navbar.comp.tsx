// app/components/Generic/Navbar.tsx
import { useDarkMode } from "@/lib/utils/hooks/useDarkMode";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "../Cart/CartDrawer";

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-primary dark:bg-primaryDark text-white p-4 w-full">
      <div className="container mx-auto flex flex-row justify-between items-center w-full">
        <Link href="/" className="text-xl font-bold">Store</Link>
        <div className="space-x-4">
          <Link href="/products">Products</Link>
          {/* <Link href="/cart">Cart</Link> */}
          <button
            onClick={toggleDarkMode}
            className="bg-secondary dark:bg-secondaryDark px-2 py-1 rounded"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="...">
            Cart
          </button>
          {isCartOpen && <CartDrawer />}
        </div>
      </div>
    </nav>
  );
};