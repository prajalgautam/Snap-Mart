"use client";

const ContactPage = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-2">Contact Us</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        Have questions? We are here to help.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-2 focus:outline-primary"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-2 focus:outline-primary"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-2 focus:outline-primary"
              required
            />
            <textarea
              placeholder="Your message..."
              rows={5}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-2 focus:outline-primary resize-none"
              defaultValue={""}
              required
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                alert("Thank you! We will get back to you soon.");
              }}
              className="bg-primary rounded-3xl text-white px-10 py-3 transition duration-300 ease max-w-fit hover:shadow-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Balkumari, Lalitpur, Nepal
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">
              support@snapmart.com.np
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">
              +977-1-5000000
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Business Hours</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sunday - Friday: 9:00 AM - 7:00 PM
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Saturday: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
