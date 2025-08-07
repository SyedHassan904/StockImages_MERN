// pages/web/License.jsx

const License = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
          License Information
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            All images on <strong>VisualStock</strong> are protected under either a Standard or Extended license. These licenses define how our content can be used, whether for personal or commercial purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Standard License</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>✔️ Use in personal or commercial projects</li>
            <li>✔️ Unlimited web usage (e.g., blogs, websites, ads)</li>
            <li>✔️ Printed materials up to 500,000 copies</li>
            <li>❌ No resale or redistribution of the image itself</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Extended License</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>✔️ All benefits of the Standard License</li>
            <li>✔️ Use in items for resale (e.g., merchandise, templates)</li>
            <li>✔️ Unlimited distribution and print runs</li>
            <li>❌ Still prohibits resale of the raw file itself</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Attribution</h2>
          <p className="text-gray-700 leading-relaxed">
            Attribution is not mandatory but is appreciated. If you wish to credit VisualStock, please link back to our homepage or the specific image used.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Prohibited Use</h2>
          <p className="text-gray-700 leading-relaxed">
            You may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>❌ Redistribute or resell the image as-is</li>
            <li>❌ Use images in offensive, defamatory, or illegal content</li>
            <li>❌ Claim ownership of the image or trademark it</li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: July 19, 2025
        </p>
      </div>
    </div>
  );
};

export default License;
