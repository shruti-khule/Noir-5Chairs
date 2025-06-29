import React from 'react';

const Cart: React.FC = () => (
  <section className="py-36">
    <h2 className="text-center uppercase text-2xl lg:text-3xl font-semibold mb-4">
      your cart
    </h2>
    <hr className="mb-8 max-w-[15rem] mx-auto border-gray-300" />

    <div className="space-y-12">
      <article className="flex flex-col gap-8">
        <div className="flex items-center gap-3 mb-20">
          <img src="/avatar.png" alt="" className="w-32 h-32 rounded-full" />
          <h3 className="text-3xl capitalize">John Doe</h3>
        </div>

        <div className="grid grid-cols-4 mdx:grid-cols-[1.5fr_1fr_.5fr] items-center text-center">
          <div className="grid grid-cols-[5rem_1fr] items-center text-left capitalize gap-2">
            <img src="/thumb.png" alt="" className="max-w-[5rem] h-20 object-contain" />
            <span>modern chair</span>
          </div>

          <div className="flex items-center justify-center gap-6 text-xl">
            <button>-</button>
            <span className="text-3xl text-primary-blue">1</span>
            <button>+</button>
          </div>

          <button className="mx-auto text-2xl text-red-600">×</button>
        </div>
      </article>
    </div>

    <div className="mt-20 flex justify-end">
      <div className="border border-gray-200 p-8 flex flex-col gap-6 w-full md:w-auto">
        <div className="flex justify-between">
          <span>subtotal</span>
          <span>$ 89.99</span>
        </div>
        <div className="flex justify-between bg-gray-50 font-bold text-primary-blue">
          <span>order total</span>
          <span>$ 89.99</span>
        </div>
      </div>
    </div>

    <div className="mt-8 flex flex-col xs:flex-row justify-between gap-5">
      <button className="px-6 py-2 bg-red-600 text-white rounded">clear cart</button>
      <button className="px-6 py-2 bg-primary-blue text-white rounded">checkout</button>
    </div>
  </section>
);

export default Cart;
