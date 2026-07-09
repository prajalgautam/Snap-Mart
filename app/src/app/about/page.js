export const metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <span className="text-primary bg-primary/10 text-xs font-medium px-4 py-1 rounded-xl">
        About SnapMart
      </span>
      <h1 className="mt-3 text-5xl font-black mb-5 dark:text-white">
        Local commerce, delivered faster
      </h1>
      <p className="max-w-3xl text-light dark:text-gray-400">
        SnapMart helps customers buy from nearby shops instead of waiting for a
        central warehouse. Customers can browse local products, place orders,
        pay online, and receive faster deliveries. Vendors get a dedicated
        dashboard to manage products, inventory, and orders, while admins manage
        users, vendors, and platform activity.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Customers", "Vendors", "Administrators"].map((item) => (
          <div
            key={item}
            className="rounded-xl bg-white p-6 shadow dark:bg-gray-900"
          >
            <h3 className="font-bold text-xl dark:text-white">{item}</h3>
            <p className="mt-2 text-sm text-light dark:text-gray-400">
              {item == "Customers"
                ? "Discover products around you and get quicker doorstep delivery."
                : item == "Vendors"
                  ? "List products, update stock, and handle incoming orders."
                  : "Oversee users, vendors, orders, and overall marketplace health."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
