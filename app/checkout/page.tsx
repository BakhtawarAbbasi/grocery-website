"use client";

import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const invoiceNo = "INV-" + Math.floor(Math.random() * 1000000);
  const [paymentMethod, setPaymentMethod] = useState<"Online" | "COD" | "">("");
  const accountNumber = "0123456789";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();

  useEffect(() => {
    const calculatedTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [cart]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!address) newErrors.address = "Address is required";
    if (!email || !email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFormAndCart = () => {
    clearCart();
    setTotal(0);
    setFirstName("");
    setLastName("");
    setAddress("");
    setEmail("");
    setPhone("");
  };

  const copyAccountNumber = () => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const sendOrderToBackend = async () => {
    const order = {
      invoice_id: invoiceNo,
      name: `${firstName} ${lastName}`,
      address,
      email,
      phone,
      date,
      time,
      total_price: total,
      item: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("https://fastapi-order-api.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(
          "Failed to save order:",
          res.status,
          res.statusText || errText
        );
        console.log("Backend response status:", res.status);
      } else {
        console.log("Order saved successfully");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleDownload = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    await sendOrderToBackend();

    const element = document.getElementById("invoice");
    if (!element) return;

    element.style.visibility = "visible";
    element.style.position = "static";
    element.style.left = "0";

    setTimeout(() => {
      const opt = {
        margin: 0.5,
        filename: `order-slip-${invoiceNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          element.style.visibility = "hidden";
          element.style.position = "absolute";
          element.style.left = "-9999px";
          setShowModal(true);
        });
    }, 300);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 p-8 bg-white shadow-lg rounded-xl md:flex-row">
          {/* Billing Info */}
          <div className="flex-1 p-6 bg-white border border-gray-200 rounded-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Billing Information
              </h2>
              <p className="text-gray-500">Please fill in your details</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="123 Main St, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="hello@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="+92 312364523"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="flex-1 p-6 border border-indigo-100 bg-indigo-50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Summary
                </h2>
                <p className="text-gray-500">Invoice #{invoiceNo}</p>
              </div>
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-indigo-600">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs.{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium">Rs.0.00</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <span className="text-lg font-bold text-indigo-600">
                      Rs.{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-3 mt-6 font-medium text-white transition-all duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download Order Slip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Invoice  */}
      <div
        id="invoice"
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          color: "#000",
          backgroundColor: "#fff",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Order Invoice
            </h1>
            <p style={{ color: "#666" }}>Thank you for your purchase</p>
          </div>
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={64}
            height={64}
            style={{ width: "100px", height: "auto" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <p>
              <strong>Invoice No:</strong> {invoiceNo}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
          </div>
          <div>
            <p>
              <strong>Customer:</strong> {firstName} {lastName}
            </p>
          </div>
        </div>

        <hr style={{ border: "1px solid #eee", margin: "20px 0" }} />

        <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "20px 0" }}>
          Order Details
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Price
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                  {item.name}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Rs.{item.price.toFixed(2)}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Rs.{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ float: "right", width: "300px", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Subtotal:</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Discount:</span>
            <span>Rs.0.00</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "16px",
              paddingTop: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <span>Total:</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>
        </div>

        <div
          style={{
            clear: "both",
            paddingTop: "50px",
            textAlign: "center",
            marginTop: "50px",
            color: "#666",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Thank you for shopping with us!</p>
          <p>
            If you have any questions about your order, please contact our
            customer support.
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 mx-4 bg-white shadow-2xl rounded-xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Order Confirmed!
              </h3>
              <p className="mt-2 text-gray-600">
                Your order slip has been downloaded
              </p>

              <div className="p-4 mt-6 mb-6 rounded-lg bg-indigo-50">
                <h4 className="font-medium text-gray-800">Payment Options</h4>
                <div className="mt-3 space-y-2 text-sm text-left">
                  <p>
                    <span className="font-medium">Bank Transfer:</span> HBL Bank
                  </p>
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="font-medium">Account No:</span>{" "}
                      {accountNumber}
                    </p>
                    <button
                      onClick={copyAccountNumber}
                      className="px-3 py-1 text-xs text-indigo-600 transition-colors duration-200 bg-white border border-indigo-600 rounded hover:bg-indigo-50 focus:outline-none"
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="py-2 font-medium text-center">OR</p>
                  <p className="text-center">Cash on Delivery</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    clearFormAndCart();
                    setShowModal(false);
                    setPaymentMethod("COD");
                  }}
                  className={`px-6 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    paymentMethod === "COD" ? "ring-2 ring-green-400" : ""
                  }`}
                >
                  I&apos;ve Paid Online
                </button>

                <button
                  onClick={() => {
                    clearFormAndCart();
                    setShowModal(false);
                    setPaymentMethod("Online");
                  }}
                  className={`px-6 py-2 text-indigo-600 transition-colors duration-200 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    paymentMethod === "Online" ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  Pay on Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}