import React from 'react';
import { useCart } from './CartContext';
import { XIcon, PlusIcon, MinusIcon } from 'lucide-react';

const Cart: React.FC = () => {
  const { isCartOpen, toggleCart, checkout, loading, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button 
              onClick={toggleCart}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading...</p>
              </div>
            ) : checkout?.lineItems?.length > 0 ? (
              <ul className="space-y-4">
                {checkout.lineItems.map((item: any) => (
                  <li key={item.id} className="flex border-b pb-4">
                    {item.variant.image && (
                      <div className="w-20 h-20 mr-4">
                        <img 
                          src={item.variant.image.src} 
                          alt={item.title}
                          className="w-full h-full object-cover rounded" 
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.variant.title !== 'Default Title' ? item.variant.title : ''}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        ${item.variant.price}
                      </p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 border rounded"
                          disabled={loading}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border rounded"
                          disabled={loading}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sm text-red-600 hover:text-red-800"
                          disabled={loading}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">Your cart is empty</p>
                <button 
                  onClick={toggleCart}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {checkout?.lineItems?.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">
                  ${checkout?.subtotalPrice}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <a
                href={checkout?.webUrl}
                className="block w-full py-3 px-4 bg-black text-white text-center rounded hover:bg-gray-800"
              >
                Proceed to Checkout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
