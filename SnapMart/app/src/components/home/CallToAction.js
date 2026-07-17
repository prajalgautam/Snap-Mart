import { REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { FaArrowRight, FaStore, FaShoppingBag } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section id="call-to-action" className="py-20 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Customer */}
          <div className="relative overflow-hidden bg-gradient-to-tr from-primary to-orange-500 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col justify-between h-80 transition-all hover:scale-[1.01] hover:shadow-primary/20">
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaShoppingBag className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Shop Local, Eat Fresh</h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                Explore stores in your immediate vicinity. Sign up for a customer account and enjoy a 15% discount on your first order.
              </p>
            </div>
            <Link
              href={REGISTER_ROUTE}
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full w-fit hover:shadow-lg transition-all"
            >
              <span>Get Started</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* Card 2: Merchant */}
          <div className="relative overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5 flex flex-col justify-between h-80 transition-all hover:scale-[1.01] hover:shadow-slate-950/45">
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6">
                <FaStore className="text-xl text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-2">Bring Your Store Online</h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                Join SnapMart as a vendor. Upload items, control catalog lists, receive real-time payouts, and grow your local market footprint.
              </p>
            </div>
            <Link
              href={`${REGISTER_ROUTE}?role=merchant`}
              className="inline-flex items-center gap-2 bg-primary text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full w-fit hover:bg-primary-dark transition-all"
            >
              <span>Register Store</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
