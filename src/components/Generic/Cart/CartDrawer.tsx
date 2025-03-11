import { useCartStore } from "@/lib/models/__stores__/cart/cart.store";
import { useState } from "react";

export const CartDrawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: { cart }, actions: { deleteModelCart, getCartTotal } } = useCartStore();
  
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
        )}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
            </div>
            
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center mb-4 border-b pb-2">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-2" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => deleteModelCart("cart", "productId", item.productId)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="text-lg font-bold">
                    Total: ${getCartTotal().toFixed(2)}
                  </p>
                  <button className="w-full mt-2 bg-primary dark:bg-primaryDark text-white py-2 rounded">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };