import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";

const PricingPage = () => {
  const navigate = useNavigate();

  // Mock function to check user authentication and get user details
  const getUserDetails = () => {
    // Replace with actual authentication logic
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user && user.userId ? user : null;
  };

  const handlePaymentNavigation = (price: number, planName: string) => {
    const user = getUserDetails();

    if (!user) {
      // Redirect to the sign-up page if the user is not authenticated
      navigate("/register");
      return;
    }

    // Navigate to the payment page with the amount, plan, and userId
    navigate(
      `/payment?amount=${price}&plan=${encodeURIComponent(
        planName
      )}&userId=${user.userId}`
    );
  };

  const pricingPlans = [
    {
      name: "Starter",
      priceMonthly: "$0/month",
      price: 0,
      description: "For hobbies \uD83E\uDDD1\u200D\uD83C\uDFA8", // 🧑‍🎨
      features: [
        "2 video testimonials",
        "12 text testimonials",
        "Public Wall of Love page",
        "Video auto transcription",
      ],
      mostPopular: false,
    },
    {
      name: "Starter Plus",
      priceMonthly: "$10/month",
      price: 10,
      description: "For small teams \uD83C\uDFE1", // 🏡
      features: [
        "4 video testimonials",
        "40 text testimonials",
        "Public Wall of Love page",
        "Video download",
        "Email support",
      ],
      mostPopular: false,
    },
    {
      name: "Premium",
      priceMonthly: "$30/month",
      price: 30,
      description: "For growing businesses \uD83D\uDCB2", // 📈
      features: [
        "10 video testimonials",
        "100 text testimonials",
        "Public Wall of Love page",
        "Advanced Analytics",
        "Email support",
      ],
      mostPopular: true,
    },
    {
      name: "Ultimate",
      priceMonthly: "$45/month",
      price: 45,
      description: "For large businesses \uD83D\uDE80", // 🚀
      features: [
        "Unlimited text testimonials",
        "Unlimited video testimonials",
        "Public Wall of Love page",
        "Advanced Analytics",
        "Custom contracts",
        "Enterprise support",
        "Email support",
      ],
      mostPopular: false,
    },
  ];

  return (
    <>
      <Header />
      <div className="pricing-page bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            The easiest way to drive more sales for your business
          </h1>
          <p className="text-lg">
            Start with 12 text testimonials and 2 video testimonials on us, then
            upgrade to our paid plan only if you're happy.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold py-2 px-4 rounded"
              onClick={() => handlePaymentNavigation(0, "Free Trial")}
            >
              7 days free trial
            </button>
            <button className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-bold py-2 px-4 rounded">
              Cancel anytime!
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-7xl mb-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 rounded-lg shadow-lg border ${
                plan.mostPopular
                  ? "border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))]"
              } flex flex-col justify-between`}
            >
              <div>
                {plan.mostPopular && (
                  <span className="badge bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm px-2 py-1 rounded">
                    MOST POPULAR
                  </span>
                )}
                <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400">{plan.description}</p>
                <p className="text-xl font-semibold mb-4">{plan.priceMonthly}</p>
                <ul className="features mt-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-green-400">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 mt-6 rounded w-full"
                onClick={() =>
                  handlePaymentNavigation(plan.price, plan.name)
                }
              >
                {plan.mostPopular ? "Get started" : "Start a free trial"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;