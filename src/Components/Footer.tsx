import React from "react";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {

  return (
    <footer className="bg-[#0A1435] text-white pt-20 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] md:gap-[5rem] md:mt-[80px] mx-8 md:ml-20 md:mr-20">
        {/* About */}
        <div className="space-y-2">
          <h3 className="text-base md:text-[1.5rem] font-bold">Noir Furniture</h3>
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
          <h3 className="text-base md:text-[1.5rem] font-bold mb-4">Follow Us</h3>
          <div className="flex gap-8 text-white">
            <FaDiscord className="w-10 h-10 p-1 border-2 border-white rounded-full text-2xl text-[#FFFFFF] fill-current cursor-pointer" />
            <FaInstagram className="w-10 h-10 p-1 border-2 border-white rounded-full text-2xl text-[#FFFFFF] fill-current cursor-pointer" />
            <FaYoutube className="w-10 h-10 p-1 border-2 border-white rounded-full text-2xl text-[#FFFFFF] fill-current cursor-pointer" />
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="text-base md:text-[1.5rem] font-bold">Phone: +1 (305) 555-9191</h3>
          <h3 className="text-base md:text-[1.5rem] font-bold">E‑Mail: noir@info.com</h3>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="pt-4 md:pt-12 mx-auto">
        <hr className="colour-white mb-8" />
        <div className="flex flex-col md:flex-row mt-12 ml-14 mr-14">
          <div className="flex-1">
            <p className="mt-4 md:mt-12">© {new Date().getFullYear()} Noir · All Rights Reserved</p>
          </div>
          <div className="flex flex-col gap-1 mt-4 md:mt-12 flex-1">
            <p>FAQ</p>
            <p>Imprint</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;