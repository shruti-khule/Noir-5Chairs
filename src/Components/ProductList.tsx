import React, { FC } from 'react';
import product_card, { Product } from '../data/product_data';
import Cell from './Cell';

interface ProductListProps {
  forwardedRef?: React.Ref<HTMLDivElement>;
  userId: string | null;
}

const shuffleArray = <T extends { id: number }>(array: readonly T[]): T[] => {
  const key = 'shuffledIDs';
  const stored = sessionStorage.getItem(key);

  const items = [...array];

  if (stored) {
    const order: number[] = JSON.parse(stored);
    items.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    return items;
  }

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  sessionStorage.setItem(key, JSON.stringify(items.map((i) => i.id)));
  return items;
};

const ProductList: FC<ProductListProps> = ({ forwardedRef, userId }) => {
  const shuffledProducts = shuffleArray(product_card);

  return (
    <div id="productList" ref={forwardedRef} className="flex flex-col items-center">
      <h4 className="mt-12 mb-6 text-2xl lg:text-3xl font-semibold text-primary-blue">
        Choose Your New Favorite Chair
      </h4>

      <div className="flex flex-wrap justify-around gap-5 rounded bg-accent-yellow/20 p-8 shadow-lg">
        {shuffledProducts.map((item) => (
          <Cell
            key={item.id}
            userId={userId ?? ''}
            shoe={{ ...item, id: String(item.id) }}
            image={item.thumb}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
