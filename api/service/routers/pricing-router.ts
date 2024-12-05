import express from "express";

const router = express.Router();

// Define a GET route for pricing plans
router.get("/", (req, res) => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$0/month",
      description: "For hobbies",
      features: [
        "1 space",
        "Public Wall of Love page",
        "Video download",
        "Video auto transcription",
        "AI style generator",
      ],
    },
    {
      name: "Starter Plus",
      price: "$10/month",
      description: "For small teams",
      features: [
        "Unlimited text testimonials",
        "AI space creator",
        "Public Wall of Love page",
        "Video download",
      ],
    },
    {
      name: "Premium",
      price: "$20/month/space",
      description: "For growing businesses",
      features: [
        "Unlimited testimonials",
        "AI case study generator",
        "Advanced analytics",
      ],
    },
    {
      name: "Ultimate",
      price: "$30/month/space",
      description: "For large businesses",
      features: [
        "Unlimited testimonials",
        "Custom contracts",
        "Enterprise support",
      ],
    },
  ];

  res.status(200).json(pricingPlans);
});

export default router;
