import { useState } from "react";
import CheckoutForm from "../CheckoutForm";

export default function CartPage({ cart, updateQty, removeFromCart, clearCart }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrderSuccess = (receiptData) => {
    setOrderReceipt(receiptData);
    setShowCheckout(false);
    clearCart();
  };

  if (orderReceipt) {
    return (
      <div
        className="status-box receipt-box"
      >
        <span className="receipt-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">ORDER CONFIRMED</p>
        <h2>Thanks for your order.</h2>
        <p>
          <strong>Customer:</strong> {orderReceipt.customer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {orderReceipt.customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {orderReceipt.customer.phone}
        </p>
        <p>
          <strong>Address:</strong> {orderReceipt.customer.address}
        </p>
        <p>
          <strong>Shipping:</strong> {orderReceipt.shippingLabel} ($
          {orderReceipt.shippingFee.toFixed(2)})
        </p>
        <p>
          <strong>Grand Total:</strong> ${orderReceipt.grandTotal.toFixed(2)}
        </p>
        <button
          type="button"
          onClick={() => setOrderReceipt(null)}
          className="checkout-btn"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="status-box">
        <span className="empty-cart-icon" aria-hidden="true">🛍️</span>
        <p className="eyebrow">NOTHING IN YOUR BAG YET</p>
        <h2>Your next favorite is waiting.</h2>
        <p className="empty-cart-copy">Head back to the shop and find your everyday essential.</p>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <CheckoutForm
        cart={cart}
        subtotal={subtotal}
        onBack={() => setShowCheckout(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-card">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <h2>Your bag</h2>
          </div>
          <span className="product-count">{cart.reduce((sum, item) => sum + item.qty, 0)} items</span>
        </div>
        <div className="cart-table-wrap">
          <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className={`cart-product-icon product-art-${item.color}`} aria-hidden="true">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </td>
                <td>${(item.price * item.qty).toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      <aside className="cart-card order-summary-card">
        <p className="eyebrow">THE TOTAL</p>
        <h2>Order summary</h2>
        <div className="summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <hr className="summary-divider" />
        <div className="summary-line total-line">
          <strong>Grand Total</strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <button
          type="button"
          onClick={() => setShowCheckout(true)}
          className="checkout-btn"
          style={{ width: "100%", marginTop: "14px" }}
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}