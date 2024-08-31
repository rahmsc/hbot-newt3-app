const EmailInputForm = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-64 mb-12 text-center">
        <p className="text-4xl text-gray-700">
          DISCOVER THE BEST IN HYPERBARIC OXYGEN THERAPY. BY ENTERING <br />
          YOUR EMAIL BELOW, YOU&rsquo;LL BE THE FIRST TO <br />
          RECEIVE EXCLUSIVE INSIDER UPDATES, <br />
          DELIVERED DIRECTLY TO YOUR INBOX.
        </p>
      </div>

      {/* Email Input Form */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <form className="flex items-center space-x-2">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailInputForm;
