export const metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <span className="text-primary bg-primary/10 text-xs font-medium px-4 py-1 rounded-xl">
        Contact
      </span>
      <h1 className="mt-3 text-5xl font-black mb-5 dark:text-white">
        Talk to SnapMart
      </h1>
      <p className="max-w-2xl text-light dark:text-gray-400">
        Need help with an order, want to bring your shop online, or have a
        platform question? Reach out and our team will help you get moving.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Customer Support", "Vendor Onboarding", "Admin Help"].map((item) => (
          <div
            key={item}
            className="rounded-xl bg-white p-6 shadow dark:bg-gray-900"
          >
            <h3 className="font-bold text-xl dark:text-white">{item}</h3>
            <p className="mt-2 text-sm text-light dark:text-gray-400">
              support@snapmart.local
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactPage;
