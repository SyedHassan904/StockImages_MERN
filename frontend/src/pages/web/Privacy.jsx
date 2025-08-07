// pages/web/Privacy.jsx
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Your privacy matters. This policy outlines how we handle your data and protect your information while using our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Data We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect basic information such as your name, email address, and usage behavior. This helps us provide personalized content, improve features, and ensure account security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How We Use Your Data</h2>
          <p className="text-gray-700 leading-relaxed">
            Your data is used solely to enhance user experience, track performance, and maintain system integrity. We do not sell or rent your data to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            We may integrate trusted third-party services (like payment providers or analytics tools) that require basic data to function. All such usage is governed by respective privacy policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies for authentication, preferences, and analytics. You can choose to disable cookies in your browser, but this may affect your experience.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal data. For any data-related inquiries, please contact our support team.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: July 19, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
