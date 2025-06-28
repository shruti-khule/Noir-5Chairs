import React from "react";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  /** Smooth-scroll helper */
  const handleClick = (): void => {
    const element = document.getElementById("header");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-white pt-24 pb-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
        {/* About */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-secondary">Noir Furniture</h3>
          <p>
            743 Evergreen Terrace
            <br />
            Springfield, IL 62704
            <br />
            USA
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold text-secondary mb-4">Follow Us</h3>
          <div className="flex gap-8">
            <FaDiscord className="p-4 border-2 border-white rounded-full text-2xl cursor-pointer" />
            <FaInstagram className="p-4 border-2 border-white rounded-full text-2xl cursor-pointer" />
            <FaYoutube className="p-4 border-2 border-white rounded-full text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-secondary">Phone: +1 (305) 555-9191</h3>
          <h3 className="text-xl font-bold text-secondary">E‑Mail: noir@info.com</h3>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="pt-4 md:pt-12 container mx-auto px-8">
        <hr className="border-secondary mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Noir · All Rights Reserved</p>
          <div className="flex gap-6">
            <button onClick={handleClick} className="hover:underline">FAQ</button>
            <button onClick={handleClick} className="hover:underline">Imprint</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;