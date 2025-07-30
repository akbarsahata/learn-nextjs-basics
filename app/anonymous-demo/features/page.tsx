import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AnonymousFeaturesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current User:", user);

  if (!user) {
    redirect("/login");
  }

  const isAnonymous = user.is_anonymous;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌟 Anonymous User Features
          </h1>
          <p className="text-xl text-gray-600">
            Explore what you can do{" "}
            {isAnonymous ? "as an anonymous user" : "with a permanent account"}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Shopping Cart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Shopping Cart
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Add items to your cart and browse without creating an account.
              Perfect for quick purchases.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>

          {/* Quick Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick Notes
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Jot down quick thoughts and ideas. Great for temporary note-taking
              during browsing.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              User Preferences
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Save theme preferences, language settings, and other
              customizations during your session.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>

          {/* Session Analytics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Session Analytics
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Track your activity during the current session. See what features
              you use most.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>

          {/* Demo Mode */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🎮</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Full Demo Access
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Try all features without commitment. Perfect for evaluating the
              platform.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>

          {/* Temporary Files */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📁</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Temporary Storage
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Upload and work with files temporarily. Great for quick edits or
              sharing.
            </p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAnonymous
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {isAnonymous ? "Available" : "Enhanced"}
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Anonymous vs Permanent Account
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-orange-600">
                    Anonymous
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-blue-600">
                    Permanent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium">Data Persistence</td>
                  <td className="py-3 px-4 text-center">Session Only</td>
                  <td className="py-3 px-4 text-center">✅ Forever</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Multi-device Access</td>
                  <td className="py-3 px-4 text-center">❌ Single Device</td>
                  <td className="py-3 px-4 text-center">✅ All Devices</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Email Notifications</td>
                  <td className="py-3 px-4 text-center">❌ Not Available</td>
                  <td className="py-3 px-4 text-center">✅ Available</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Two-Factor Auth</td>
                  <td className="py-3 px-4 text-center">❌ Not Available</td>
                  <td className="py-3 px-4 text-center">✅ Available</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Premium Features</td>
                  <td className="py-3 px-4 text-center">⚠️ Limited</td>
                  <td className="py-3 px-4 text-center">✅ Full Access</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Data Export</td>
                  <td className="py-3 px-4 text-center">❌ Not Available</td>
                  <td className="py-3 px-4 text-center">✅ Available</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Account Recovery</td>
                  <td className="py-3 px-4 text-center">❌ Not Possible</td>
                  <td className="py-3 px-4 text-center">✅ Email Reset</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        {isAnonymous && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Keep Your Data?
            </h2>
            <p className="mb-6 text-blue-100">
              Upgrade to a permanent account and never lose your progress again.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/anonymous-demo/upgrade"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Upgrade Now
              </Link>
              <Link
                href="/anonymous-demo"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Continue Demo
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-6">
            <Link
              href="/anonymous-demo"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Back to Demo
            </Link>
            <Link
              href="/private"
              className="text-gray-600 hover:text-gray-500 font-medium"
            >
              Profile
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
