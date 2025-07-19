// pages/web/Pricing.jsx
import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '0',
    currency: '$',
    description: 'Great for trying things out',
    features: [
      'Browse images',
      'Basic resolution download',
      'Limited personal use',
    ],
    buttonText: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Standard',
    price: '9.99',
    currency: '$',
    description: 'Perfect for creators & small businesses',
    features: [
      'High-resolution downloads',
      'Commercial use allowed',
      'Access to all categories',
      'Standard license included',
    ],
    buttonText: 'Buy Now',
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '24.99',
    currency: '$',
    description: 'For teams & professional use',
    features: [
      'Unlimited downloads',
      'Extended commercial license',
      'Priority support',
      'Custom watermark removal',
    ],
    buttonText: 'Subscribe',
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900">Choose Your Plan</h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Simple pricing for everyone. Whether you're just browsing or need full commercial rights,
          we’ve got you covered.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl shadow-lg border p-8 flex flex-col justify-between ${
              plan.isPopular ? 'border-indigo-600 ring-2 ring-indigo-500' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -mt-14 ml-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full uppercase font-bold shadow-md">
                Most Popular
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              <div className="mt-6 text-4xl font-extrabold text-gray-900">
                {plan.currency}
                {plan.price}
                <span className="text-base font-medium text-gray-500"> /month</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-8 w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              onClick={() => alert(`You selected ${plan.name} plan`)}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
