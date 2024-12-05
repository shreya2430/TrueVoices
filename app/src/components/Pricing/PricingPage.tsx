import React, { useEffect, useState } from "react";

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  mostPopular: boolean;
};

const PricingPage = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch pricing plans from the backend
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch("http://localhost:3003/v1/pricing");
        if (!response.ok) {
          throw new Error("Failed to fetch pricing plans");
        }
        const data = await response.json();
        setPricingPlans(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPricingPlans();
  }, []);

  return (
    <div className="pricing-page text-white bg-gray-900 min-h-screen py-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          The easiest way to drive more sales for your business
        </h1>
        <p className="text-lg">
          Start with 12 text testimonials and 2 video testimonials on us, then
          upgrade to our paid plan only if you're happy.
        </p>
        <button className="bg-yellow-400 text-black font-bold py-2 px-4 mt-6 rounded">
          7 days free trial, cancel anytime!
        </button>
      </div>

      <div className="toggle-billing flex justify-center items-center mb-10">
        <label className="mr-4">Billed Monthly</label>
        <input
          type="checkbox"
          id="billingToggle"
          className="toggle-checkbox hidden"
        />
        <label
          htmlFor="billingToggle"
          className="toggle-label bg-gray-700 p-2 rounded-full cursor-pointer"
        >
          <span className="toggle-indicator bg-blue-500 block w-8 h-8 rounded-full"></span>
        </label>
        <label className="ml-4">Billed Yearly</label>
      </div>

      {error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
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
                {plan.price}
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
     
