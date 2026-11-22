import { useState } from "react";

const SHIPPING_RATES = {
  standard: { label: "Standard Shipping (2-3 days)", fee: 5.0 },
  express: { label: "Express Shipping (Same day)", fee: 12.99 },
  pickup: { label: "Store Pickup (Free)", fee: 0.0 },
};

export default function CheckoutForm({
  cart,
  subtotal,
  discount = 0,
  onBack,
  onOrderSuccess,
}) {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    shippingMethod: "standard",
  });

  const [errors, setErrors] = useState({});

  const shippingFee =
    cart.length > 0 ? SHIPPING_RATES[customer.shippingMethod]?.fee ?? 0 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!customer.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!customer.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!customer.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onOrderSuccess({
      customer: {
        ...customer,
        fullName: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
      },
      shippingLabel: SHIPPING_RATES[customer.shippingMethod].label,
      items: cart,
      subtotal,
      shippingFee,
      discount,
      grandTotal,
    });
  };

  return (
    <div className="checkout-layout">
      <form className="cart-card checkout-form-card" onSubmit={handleSubmit} noValidate>
        <div className="checkout-header">
          <h3 style={{ margin: 0 }}>Customer Checkout Form</h3>
          <button type="button" onClick={onBack} className="nav-tab-btn">
            ← Back to Cart
          </button>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={customer.firstName}
              onChange={handleChange}
              className={errors.firstName ? "input-error" : ""}
            />
            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={customer.lastName}
              onChange={handleChange}
              className={errors.lastName ? "input-error" : ""}
            />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={customer.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="012 345 678"
            value={customer.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            placeholder="Street, commune/sangkat, district/khan, city/province"
            value={customer.address}
            onChange={handleChange}
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && <span className="field-error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="shippingMethod">Shipping Method</label>
          <select
            id="shippingMethod"
            name="shippingMethod"
            value={customer.shippingMethod}
            onChange={handleChange}
          >
            {Object.entries(SHIPPING_RATES).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label} — ${option.fee.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="checkout-btn" style={{ width: "100%" }}>
          Place Order
        </button>
      </form>

      <aside className="cart-card order-summary-card">
        <h3 style={{ marginTop: 0 }}>Order Summary</h3>

        <div className="summary-items">
          {cart.map((item) => (
            <div key={item.id} className="summary-item-row">
              <span>
                {item.title} <strong>× {item.qty}</strong>
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="summary-divider" />

        <div className="summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping ({SHIPPING_RATES[customer.shippingMethod].label})</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="summary-line">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <hr className="summary-divider" />

        <div className="summary-line total-line">
          <strong>Grand Total</strong>
          <strong>${grandTotal.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}