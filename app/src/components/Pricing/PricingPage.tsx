import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";

// Define the type for each pricing plan
type PricingPlan = {
  name: string;
  priceMonthly: string;
  price: number; // Ensure this is defined in the translation.json
  description: string;
  features: string[];
  textCredits: number; // Ensure this is added in translation.json
  videoCredits: number; // Ensure this is added in translation.json
  mostPopular: boolean;
};

const PricingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch pricing plans with type assertion
  const pricingPlans: PricingPlan[] = t("pricing.plans", {
    returnObjects: true,
  }) as PricingPlan[];

  const handlePaymentNavigation = (
    price: number,
    planName: string,
    textCredits: number,
    videoCredits: number
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      // Redirect to the register page if the user is not logged in
      navigate("/register");
      return;
    }

    // Navigate to the payment page with the required parameters
    navigate(
      `/payment?amount=${price}&plan=${encodeURIComponent(
        planName
      )}&userId=${user.id}&textCredits=${textCredits}&videoCredits=${videoCredits}`
    );
  };

  const handleGetStarted = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      // Redirect to the register page if the user is not logged in
      navigate("/register");
    } else {
      // Navigate to the route page if the user is logged in
      navigate('/dashboard')
    }
  };

  return (
    <>
      <Header />
      <div className="pricing-page bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{t("pricing.title")}</h1>
          <p className="text-lg">{t("pricing.subtitle")}</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold py-2 px-4 rounded hover:bg-[hsl(var(--primary)/1.2)] transition"
              onClick={handleGetStarted}
            >
              {t("pricing.getStarted")}
            </button>
          </div>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-7xl mb-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-7 rounded-lg shadow-lg border ${
                plan.mostPopular
                  ? "border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))]"
              } flex flex-col justify-between`}
            >
              <div>
                {plan.mostPopular && (
                  <span className="badge bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm px-2 py-1 rounded">
                    {t("pricing.mostPopular")}
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
              {plan.name === "Starter" ? (
                <button
                  color="primary"
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 mt-5"
                  onClick={handleGetStarted}
                >
                  {t("pricing.getStarted")}
                </button>
              ) : (
                <button
                    color="primary"
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 mt-5"
                    onClick={() =>
                    handlePaymentNavigation(
                      plan.price,
                      plan.name,
                      plan.textCredits,
                      plan.videoCredits
                    )
                  }
                >
                  {t("pricing.buyNow")}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;