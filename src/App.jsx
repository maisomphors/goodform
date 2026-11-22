import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";

const products = [
  {
    id: 1,
    title: "Laptop",
    price: 650,
    category: "Computers",
    description: "Your everyday setup, ready to go.",
    icon: "💻",
    color: "lavender",
  },
  {
    id: 2,
    title: "Mouse",
    price: 15,
    category: "Accessories",
    description: "A comfortable click, all day long.",
    icon: "🖱️",
    color: "peach",
  },
  {
    id: 3,
    title: "Keyboard",
    price: 25,
    category: "Accessories",
    description: "Make every keystroke count.",
    icon: "⌨️",
    color: "mint",
  },
  {
    id: 4,
    title: "Monitor",
    price: 120,
    category: "Displays",
    description: "A little more room to think.",
    icon: "🖥️",
    color: "blue",
  },
];

export default function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Navbar page={page} setPage={setPage} totalItems={totalItems} />

      <div className="app-container">
        {page === "shop" ? (
          <ProductList
            products={products}
            addToCart={addToCart}
          />
        ) : (
          <CartPage
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
      </div>
    </>
  );
}