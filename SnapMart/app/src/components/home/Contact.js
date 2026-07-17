const Contact = () => {
  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28260.980470921085!2d85.3331376!3d27.6726907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d0b4f8c4b9%3A0x5c5e5b5c5b5c5b5c!2sNCIT%20College!5e0!3m2!1sen!2snp!4v1!5m2!1sen!2snp"
          height={200}
          style={{ border: 0, width: "100%", borderRadius: "2rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-8">
          <form className="flex flex-col gap-4 bg-white dark:bg-gray-950 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md" action="#">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="w-full bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Phone Number"
              className="w-full bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <textarea
              name="message"
              id="message"
              placeholder="How can we help your shop or order?"
              rows={4}
              className="w-full bg-slate-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              defaultValue={""}
            />
            <button className="bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-full px-8 py-3.5 transition duration-300 ease max-w-fit mt-2 shadow-lg shadow-primary/20">
              Send Message
            </button>
          </form>
          <div className="info flex flex-col justify-center">
            <h2 className="text-3xl dark:text-white font-black tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm my-4 leading-relaxed">
              Have questions about listing your store on SnapMart, API integrations, or deliveries? Reach out to our hyperlocal coordination team.
            </p>
            <div className="space-y-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <a
                href="https://maps.app.goo.gl/NCITCollegeBalkumari"
                target="_blank"
                className="flex items-center gap-2 hover:text-primary transition-all"
              >
                <span>📍</span> <span>SnapMart Lalitpur Hub — Balkumari, Lalitpur, Nepal</span>
              </a>
              <a
                href="mailto:support@snapmart.com"
                className="flex items-center gap-2 hover:text-primary transition-all"
              >
                <span>📨</span> <span>support@snapmart.com</span>
              </a>
              <a
                href="tel:+977-1-5000000"
                className="flex items-center gap-2 hover:text-primary transition-all"
              >
                <span>📞</span> <span>+977-1-5000000</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
