import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { addToCart, clearData, removeFromCart, saveNote } from "./actions";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

export default async function AnonymousDemoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user data from metadata
  const cart: CartItem[] = user.user_metadata?.cart || [];
  const notes: Note[] = user.user_metadata?.notes || [];
  const isAnonymous = user.is_anonymous;

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAnonymous ? "🕶️ Anonymous Demo" : "👤 Authenticated Demo"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isAnonymous
                  ? "You're browsing anonymously. Your data is temporary and tied to this session."
                  : `Welcome back, ${user.email}! Your data is permanently saved.`}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isAnonymous
                    ? "bg-orange-100 text-orange-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {isAnonymous ? "Anonymous User" : "Permanent User"}
              </div>
              {isAnonymous && (
                <p className="text-xs text-gray-500 mt-1">User ID: {user.id}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shopping Cart Demo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🛒 Shopping Cart
            </h2>

            {/* Add items form */}
            <form action={addToCart} className="mb-4">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <input
                  type="text"
                  name="item"
                  placeholder="Item name"
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  step="0.01"
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Qty"
                  defaultValue="1"
                  min="1"
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Add to Cart
              </button>
            </form>

            {/* Cart items */}
            <div className="space-y-2 mb-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  Your cart is empty
                </p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <form action={removeFromCart}>
                      <input type="hidden" name="item" value={item.name} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    Total: ${cartTotal.toFixed(2)}
                  </span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notes Demo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📝 Quick Notes
            </h2>

            {/* Add note form */}
            <form action={saveNote} className="mb-4">
              <textarea
                name="note"
                placeholder="Write a quick note..."
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm"
              >
                Save Note
              </button>
            </form>

            {/* Notes list */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No notes yet</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded"
                  >
                    <p className="text-sm text-gray-800">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Account Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isAnonymous && (
              <Link
                href="/anonymous-demo/upgrade"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-center font-medium"
              >
                🔐 Upgrade to Permanent Account
              </Link>
            )}

            <form action={clearData}>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 font-medium"
              >
                🗑️ Clear All Data
              </button>
            </form>

            <Link
              href="/private"
              className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 text-center font-medium"
            >
              📊 View Profile
            </Link>
          </div>

          {isAnonymous && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-medium text-orange-800 mb-2">
                ⚠️ Important Notice
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>
                  • Your data is stored temporarily in this browser session
                </li>
                <li>
                  • Data will be lost if you sign out, clear browser data, or
                  use another device
                </li>
                <li>• Upgrade to a permanent account to keep your data safe</li>
                <li>
                  • Anonymous sessions automatically expire after 24 hours
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-4">
            <Link
              href="/anonymous-demo/features"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              More Features
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-500 font-medium"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
