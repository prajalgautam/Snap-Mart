export const metadata = {
  title: "About SnapMart",
};

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-primary via-indigo-600 to-purple-600 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
            Digitizing Neighborhood Shopping
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-6 tracking-tight leading-tight">
            Meet <span className="underline decoration-wavy decoration-yellow-400 decoration-3">SnapMart</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
            A hyperlocal multi-vendor e-commerce platform bridging local neighborhood shops directly with nearby customers for instant order delivery.
          </p>
        </div>
      </section>

      {/* Mission & Problem/Solution Grid */}
      <section className="container mx-auto px-6 -mt-10 relative z-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all hover:scale-[1.01]">
            <div className="text-3xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Problem</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard e-commerce delivery takes days. Local shopkeepers have no online visibility, and customers spend time visiting multiple stores to compare prices and check product availability.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all hover:scale-[1.01]">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Solution</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              SnapMart brings local shops and customers together. Customers compare nearby stock, prices, and receive products instantly, while merchants get a premium dashboard to list inventory.
            </p>
          </div>
        </div>
      </section>

      {/* Unique Interface Showcase Section */}
      <section className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            One Platform. Three Tailored Interfaces.
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
            SnapMart features highly distinct, separate dashboards tailored specifically to the workflow needs of each user class.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer UI */}
          <div className="flex flex-col bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-blue-500/20 shadow-md">
            <div className="h-3 bg-blue-600" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Customer UI
                </span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">
                  Friendly Shopping
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Clean, interactive marketplace. Search brand milk, compare prices, filter nearby pharmacy stock, manage a personal shopping cart, and track deliveries.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 text-[10.5px] font-semibold text-blue-500">
                🎨 Accent Colors: Blue & Gold
              </div>
            </div>
          </div>

          {/* Merchant Portal */}
          <div className="flex flex-col bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-teal-500/20 shadow-md">
            <div className="h-3 bg-teal-600" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-teal-500/10 text-teal-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Merchant Portal
                </span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">
                  Store Console
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  A high-efficiency store manager panel. Features deep-green dark theme. Upload new products, manage inventory numbers, accept/reject incoming orders, and track revenue.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 text-[10.5px] font-semibold text-teal-500">
                🎨 Accent Colors: Emerald & Teal
              </div>
            </div>
          </div>

          {/* Admin Command Center */}
          <div className="flex flex-col bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-red-500/20 shadow-md">
            <div className="h-3 bg-red-600" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-red-500/10 text-red-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Admin Center
                </span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">
                  Control Board
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Platform-wide supervisor console. High contrast dark-charcoal style with red elements. Manage user access, monitor fraudulent activities, approve merchants, and view global statistics.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 text-[10.5px] font-semibold text-red-500">
                🎨 Accent Colors: Charcoal & Red
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bullet Features */}
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="bg-gradient-to-tr from-gray-900 to-slate-800 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <h3 className="text-2xl md:text-3xl font-black mb-6">Why shop with SnapMart?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <div>
                <h5 className="font-bold text-white">Hyperlocal Speed</h5>
                <p className="text-gray-400 text-xs mt-0.5">Products come from nearby community stores, enabling delivery in minutes, not days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <div>
                <h5 className="font-bold text-white">Supporting Local Businesses</h5>
                <p className="text-gray-400 text-xs mt-0.5">Empowers neighborhood retail locations to match modern digital marketplaces.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <div>
                <h5 className="font-bold text-white">Stock Availability Sync</h5>
                <p className="text-gray-400 text-xs mt-0.5">Check inventory counts at checkout, avoiding out-of-stock cancellation issues.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <div>
                <h5 className="font-bold text-white">Integrated Payments</h5>
                <p className="text-gray-400 text-xs mt-0.5">Supports Digital Wallet payments (Khalti integration) and traditional Cash on Delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
