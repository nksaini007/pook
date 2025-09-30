import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Nev from "./Nev";
import Footer from "./Footer";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Nev />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-indigo-400">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-10">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="grid gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-300">{item.name}</h3>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-green-400 font-bold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 sm:mt-0 sm:ml-4 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-semibold hover:from-red-600 hover:to-pink-600 transition shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-indigo-400 mb-4 sm:mb-0">
                Total: ₹{total.toFixed(2)}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition shadow-lg"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => alert("Proceed to Checkout")}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-xl font-semibold hover:from-green-600 hover:to-lime-500 transition shadow-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
