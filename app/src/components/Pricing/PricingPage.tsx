import React, { useState } from "react";

const PricingPage = () => {
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      priceMonthly: "$0/month",
      priceYearly: "$0/year",
      description: "For hobbies 🧑‍🎨",
      features: [
        "1 space",
        "Public Wall of Love page",
        "Video download",
        "Video auto transcription",
        
      ],
      mostPopular: false,
    },
    {
      name: "Starter Plus",
      priceMonthly: "$10/month",
      priceYearly: "$100/year",
      description: "For small teams 🏡",
      features: [
        "Unlimited text testimonials",
        "2 video testimonials",
        "Public Wall of Love page",
        "Video download",  
      ],
      mostPopular: false,
    },
    {
      name: "Premium",
      priceMonthly: "$30/month",
      priceYearly: "$200/year",
      description: "For growing businesses 📈",
      features: [
        "Unlimited testimonials",
        "Public Wall of Love page",
        "Advanced Analytics",
      ],
      mostPopular: true,
    },
    {
      name: "Ultimate",
      priceMonthly: "$35/month",
      priceYearly: "$250/year",
      description: "For large businesses 🚀",
      features: [
        "Unlimited testimonials",
        "Custom contracts",
        "Enterprise support",
      ],
      mostPopular: false,
    },
  ];

  return (
    <div className="pricing-page text-white bg-gray-900 min-h-screen py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          The easiest way to drive more sales for your business
        </h1>
        <p className="text-lg">
          Start with 10 text testimonials and 2 video testimonials on us, then
          upgrade to our paid plan only if you're happy.
        </p>
        <button className="bg-yellow-400 text-black font-bold py-2 px-4 mt-6 rounded">
          7 days free trial, cancel anytime!
        </button>
      </div>

      {/* Billing Toggle */}
      <div className="toggle-billing flex justify-center items-center mb-10">
        <label className="mr-4 text-lg">Billed Monthly</label>
        <div
          className="relative flex items-center justify-center w-16 h-8 bg-gray-700 rounded-full cursor-pointer"
          onClick={() => setIsYearlyBilling(!isYearlyBilling)}
        >
          <span
            className={`absolute left-1 w-6 h-6 bg-blue-500 rounded-full transition-transform ${
              isYearlyBilling ? "transform translate-x-8" : ""
            }`}
          ></span>
        </div>
        <label className="ml-4 text-lg">Billed Yearly</label>
        <span className="ml-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          2 months off 🎁
        </span>
      </div>

      {/* Spacing Below Toggle */}
      <div className="mb-12"></div>

      {/* Pricing Cards */}
      <div className="pricing-grid grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-7xl">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card p-6 rounded-lg shadow-lg border-2 ${
              plan.mostPopular ? "border-blue-500" : "border-gray-700"
            }`}
          >
            {plan.mostPopular && (
              <span className="badge bg-blue-500 text-white text-sm px-2 py-1 rounded">
                MOST POPULAR
              </span>
            )}
            <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
            <p className="text-xl font-medium text-yellow-400 mb-4">
              {isYearlyBilling ? plan.priceYearly : plan.priceMonthly}
            </p>
            <p className="text-gray-300">{plan.description}</p>
            <ul className="features mt-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="text-green-400">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white py-2 px-4 mt-6 rounded w-full">
              {plan.mostPopular ? "Get started" : "Start a free trial"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;