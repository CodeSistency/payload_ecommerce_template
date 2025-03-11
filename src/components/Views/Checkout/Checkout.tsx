import { useCartStore } from "@/lib/models/__stores__/cart/cart.store";
import { useState } from "react";

const Checkout = () => {
    // Access cart items from the store
    const { data: { cart } } = useCartStore();
  
    // State for shipping information
    const [shippingInfo, setShippingInfo] = useState({
      name: "",
      address: "",
      phone: "",
    });
  
    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };
  
    // Calculate the total cost of items in the cart
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    // Generate the order summary for WhatsApp
    const generateOrderSummary = () => {
      const itemsSummary = cart
        .map(
          (item) =>
            `${item.title} - Quantity: ${item.quantity} - Price: $${item.price}`
        )
        .join("\n");
      const total = calculateTotal();
      return `Order Summary:\n\nItems:\n${itemsSummary}\n\nTotal: $${total}\n\nShipping Information:\nName: ${shippingInfo.name}\nAddress: ${shippingInfo.address}\nPhone: ${shippingInfo.phone}`;
    };
  
    // Handle form submission and open WhatsApp
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const orderSummary = generateOrderSummary();
      const whatsappNumber = "1234567890"; // Replace with the company's WhatsApp number
      const whatsappMessage = encodeURIComponent(orderSummary);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank");
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cart Summary Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between mb-2"
                  >
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4">
                  <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                </div>
              </div>
            )}
          </div>
  
          {/* Shipping Information Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Place Order via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Checkout;