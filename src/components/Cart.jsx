import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

const PROMO_CODES = { SAVE10: 10, METAL20: 20, FIRST50: 50 };

function QuantityControl({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onDec}
        className="w-7 h-7 rounded-md text-sm flex items-center justify-center transition-colors hover:bg-white/10 text-steel hover:text-chrome">−</button>
      <span className="w-8 text-center text-sm font-body text-chrome font-medium">{qty}</span>
      <button onClick={onInc}
        className="w-7 h-7 rounded-md text-sm flex items-center justify-center transition-colors hover:bg-white/10 text-steel hover:text-chrome">+</button>
    </div>
  );
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [placing, setPlacing] = useState(false);

  const discountAmt = appliedPromo ? Math.round((subtotal * PROMO_CODES[appliedPromo]) / 100) : 0;
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal - discountAmt + delivery;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      toast.success(`Promo applied! ${PROMO_CODES[code]}% off`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const orderData = {
        userEmail: user.email,
        userId: user.id,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || "",
        })),
        totalAmount: total,
        promoCode: appliedPromo || "",
        discount: discountAmt,
        deliveryCharge: delivery,
      };
      await api.post("/api/orders", orderData);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/order");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-metal-radial flex items-center justify-center">
        <div className="text-center space-y-4 animate-scale-fade">
          <div className="text-8xl opacity-20">🛒</div>
          <h2 className="font-heading text-4xl text-gradient-steel">YOUR CART IS EMPTY</h2>
          <p className="text-steel font-body text-sm">Discover our premium collection</p>
          <button onClick={() => navigate("/product")} className="btn-copper px-8 py-3 text-sm">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-metal-radial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-heading text-5xl text-gradient-steel mb-2">YOUR CART</h1>
        <p className="text-steel font-body text-sm mb-8">{itemCount} item{itemCount !== 1 ? "s" : ""} selected</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="metal-card p-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-obsidian-700">
                  <img src={item.imageUrl || `https://picsum.photos/seed/${item._id}/200`}
                    alt={item.name} className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://picsum.photos/seed/${item._id}/200`; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-chrome text-sm truncate">{item.name}</h3>
                  <p className="text-steel text-xs font-body mt-0.5">{fmtPrice(item.price)} each</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <QuantityControl
                    qty={item.quantity}
                    onInc={() => updateQty(item._id, item.quantity + 1)}
                    onDec={() => updateQty(item._id, item.quantity - 1)}
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-lg text-gradient-gold">{fmtPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item._id)}
                      className="text-steel hover:text-red-400 transition-colors text-lg leading-none">×</button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => { if (window.confirm("Clear all items?")) clearCart(); }}
              className="btn-ghost px-4 py-2 text-xs text-steel mt-2">
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Promo code */}
            <div className="metal-card p-5">
              <h3 className="font-heading text-lg text-gradient-copper mb-3">PROMO CODE</h3>
              {appliedPromo ? (
                <div className="flex items-center justify-between text-sm font-body">
                  <span className="text-green-400 font-medium">✓ {appliedPromo} applied</span>
                  <button onClick={() => { setAppliedPromo(null); setPromoInput(""); }} className="text-steel hover:text-chrome transition-colors text-xs">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="SAVE10 / METAL20" className="metal-input px-3 py-2 text-sm flex-1" />
                  <button onClick={applyPromo} className="btn-ghost px-4 py-2 text-sm">Apply</button>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="metal-card p-5 space-y-3">
              <h3 className="font-heading text-lg text-gradient-copper mb-1">ORDER SUMMARY</h3>
              <div className="metal-divider" />
              <div className="space-y-2.5 text-sm font-body">
                <div className="flex justify-between text-steel"><span>Subtotal</span><span className="text-chrome">{fmtPrice(subtotal)}</span></div>
                {discountAmt > 0 && (
                  <div className="flex justify-between" style={{ color: "#6EE7B7" }}><span>Discount ({PROMO_CODES[appliedPromo]}%)</span><span>−{fmtPrice(discountAmt)}</span></div>
                )}
                <div className="flex justify-between text-steel"><span>Delivery</span><span className={delivery === 0 ? "text-green-400" : "text-chrome"}>{delivery === 0 ? "FREE" : fmtPrice(delivery)}</span></div>
                {delivery > 0 && <p className="text-xs text-steel">Free delivery on orders above ₹999</p>}
              </div>
              <div className="metal-divider" />
              <div className="flex justify-between items-center">
                <span className="font-heading text-lg text-gradient-steel">TOTAL</span>
                <span className="font-heading text-2xl text-gradient-gold">{fmtPrice(total)}</span>
              </div>
              <button onClick={placeOrder} disabled={placing}
                className="btn-copper w-full py-4 text-sm font-semibold tracking-wider mt-2"
                style={{ opacity: placing ? 0.7 : 1 }}>
                {placing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Placing order…
                  </span>
                ) : "Place Order →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
