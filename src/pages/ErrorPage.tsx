import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage: React.FC = () => (
  <section className="py-36 text-center">
    <div className="px-8">
      <h2 className="text-[80px] font-extrabold">404 ERROR</h2>
      <h3 className="text-[42px] font-semibold">You are lost</h3>
      <p className="mt-4 mb-10 text-primary-blue">
        The page you are looking for does not exist. Click the button below to go back to the
        home page.
      </p>

      <NavLink to="/">
        <button className="px-8 py-3 bg-primary-blue text-white rounded">Go Back to Home</button>
      </NavLink>
    </div>
  </section>
);

export default ErrorPage;
