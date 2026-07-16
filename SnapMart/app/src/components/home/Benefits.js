const benefits = [
  {
    icon: "🚚",
    label: "Hyperlocal Delivery",
    info: "Order from nearby stores and get products delivered in record time.",
  },
  {
    icon: "📍",
    label: "Nearby Stores",
    info: "Discover local grocery stores, pharmacies, and shops near you.",
  },
  {
    icon: "🤖",
    label: "AI Recommendations",
    info: "Smart product suggestions based on your preferences and behavior.",
  },
  {
    icon: "💳",
    label: "Secure Payment",
    info: "Pay via Khalti or Cash on Delivery. Safe and easy.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-bold text-2xl dark:text-white">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefits-card">
              <span className="text-4xl">{benefit.icon}</span>
              <h4 className="text-lg dark:text-gray-200 font-medium">
                {benefit.label}
              </h4>
              <p className="text-light dark:text-gray-400 text-center text-sm">
                {benefit.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
