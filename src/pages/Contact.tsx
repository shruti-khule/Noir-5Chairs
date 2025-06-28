import React from 'react';

const Contact: React.FC = () => (
  <section className="py-36 text-center">
    <h1 className="text-5xl font-bold mb-16">Contact Us</h1>

    <form className="max-w-[50rem] mx-auto flex flex-col gap-12">
      {/* name */}
      <input
        required
        type="text"
        placeholder="Your name"
        className="border p-4 uppercase tracking-wide"
      />

      {/* e-mail */}
      <input
        required
        type="email"
        placeholder="Your e-mail"
        className="border p-4 uppercase tracking-wide"
      />

      {/* message */}
      <textarea
        required
        rows={5}
        placeholder="Message"
        className="border p-4 uppercase tracking-wide resize-none"
      />

      {/* submit */}
      <input
        type="submit"
        value="Send message"
        className="cursor-pointer bg-primary-blue text-white py-3 rounded
                   transition hover:bg-white hover:text-primary-blue hover:border
                   hover:border-primary-blue hover:scale-90"
      />
    </form>
  </section>
);

export default Contact;
