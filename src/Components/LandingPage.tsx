import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga4';

interface HeroSectionProps {
  /** Google-Analytics user ID */
  userId: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userId }) => {
  const handleClick = () => {
    ReactGA.event({ category: 'clicked shop Now', action: userId });
    document.getElementById('productList')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-20 pb-2.5 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-9">
        {/* ---------- copy ---------- */}
        <div className="ml-12">
          <p className="uppercase tracking-wide text-primary-blue mb-2">
            Welcome to
          </p>
          <h1 className="capitalize font-bold text-primary-blue text-5xl lg:text-6xl">
            NOIR
          </h1>
          <p className="text-primary-blue text-xl lg:text-2xl">
            Timeless Elegance, Enduring Style
          </p>

          <NavLink to="#">
            <button
              onClick={handleClick}
              className="mt-6 inline-block bg-primary-blue text-white font-semibold px-6 py-3 rounded-xl
                         transition hover:bg-accent-yellow hover:text-primary-blue"
            >
              Shop Now
            </button>
          </NavLink>
        </div>

        {/* ---------- hero image ---------- */}
        <div className="mt-2.5 w-4/5 lg:w-1/2 mx-auto flex justify-end">
          <figure className="relative w-full">
            {/* former ::after pseudo-element */}
            <span
              aria-hidden
              className="absolute left-1/2 -top-20 -z-10 h-4/5 w-3/5 bg-primary-blue"
            />
            <img
              src="images/image1_heading.png"
              alt="Noir hero"
              className="w-full h-auto object-contain"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
