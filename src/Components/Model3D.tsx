import React, { useState } from 'react';
import product_card from '../data/product_data';

interface Model3DProps {
  /** The product whose images you’re rendering */
  product: typeof product_card[number] | null;
  mode?: string;
}

const Model3D: React.FC<Model3DProps> = ({ product }) => {
  const [section, setSection] = useState(3);
  const imageUrl = product?.images?.[section] ?? '';

  const handleHover = (e: React.MouseEvent<HTMLLIElement>) =>
    setSection(Number((e.currentTarget as HTMLLIElement).value));

  return (
    <section className="flex justify-center items-center">
      <div
        className="w-3/5 md:w-11/12 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <ul
          className="list-none m-0 p-0 w-full
                     h-[50rem] md:h-[40rem] xs:h-[30rem]
                     flex justify-around"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <li
              key={val}
              value={val}
              onMouseEnter={handleHover}
              className="w-1/5 h-full flex items-center justify-center"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Model3D;
