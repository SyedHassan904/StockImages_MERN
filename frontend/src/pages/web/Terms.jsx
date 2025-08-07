// pages/web/Terms.jsx
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our website, you agree to be bound by these Terms & Conditions and all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. License & Usage</h2>
          <p className="text-gray-700 leading-relaxed">
            All images available on this platform are subject to licensing terms. Redistribution, resale, or commercial use without proper licensing is prohibited.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content, including images, text, and branding, is the property of the respective owners and protected by copyright laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Misuse & Restrictions</h2>
          <p className="text-gray-700 leading-relaxed">
            Any unauthorized use, duplication, or manipulation of content is strictly prohibited and may lead to legal action.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of the site following changes signifies acceptance of those changes.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: July 19, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;
