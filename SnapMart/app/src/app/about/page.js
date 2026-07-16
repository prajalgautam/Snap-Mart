export const metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-black mb-5">About SnapMart</h1>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        SnapMart is an AI-powered hyperlocal shopping platform that connects
        customers with nearby local stores. Instead of ordering from a distant
        warehouse, customers buy from shops around them and receive products
        much faster.
      </p>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
        We bring together grocery stores, pharmacies, stationery shops, and
        other local retailers on one platform, making it easy to find what you
        need from the stores closest to you.
      </p>
      <h2 className="text-3xl font-bold mt-8 mb-4">Our Mission</h2>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        To digitize local retail markets by connecting customers, vendors, AI,
        and IoT into one intelligent commerce platform. We believe every local
        shop should be able to sell online without building its own website.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary/5 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">The Problem</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Delivery can take hours or days. Products shown as available are
            often out of stock. Small local shops struggle to compete with large
            online marketplaces. Customers do not know which nearby store
            has what they need.
          </p>
        </div>
        <div className="bg-primary/5 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">The Solution</h3>
          <p className="text-gray-600 dark:text-gray-400">
            A hyperlocal marketplace where shops list products and update
            inventory in real time. Customers search nearby, compare prices
            across stores, and get faster deliveries. AI recommends the best
            products and nearest vendors.
          </p>
        </div>
      </div>
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Why SnapMart?</h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li>&bull; <strong>Hyperlocal delivery</strong> &mdash; faster than traditional e-commerce</li>
          <li>&bull; <strong>Real-time inventory</strong> &mdash; IoT-powered stock tracking</li>
          <li>&bull; <strong>AI recommendations</strong> &mdash; smarter shopping experience</li>
          <li>&bull; <strong>Local first</strong> &mdash; support shops in your community</li>
          <li>&bull; <strong>Multiple payments</strong> &mdash; Khalti, Cash on Delivery</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutPage;
