import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

/**  ✨  Adjust this once you have a richer product model */
export interface Shoe {
  id: string;
  product_name: string;
  price: string | number;
}

interface CellProps {
  shoe: Shoe;
  image: string;      // URL or local import
  userId: string;
}

const Cell: React.FC<CellProps> = ({ shoe, image, userId }) => {
  const [mode, setMode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setMode(searchParams.get("mode"));
  }, []);

  const handleClick = async (): Promise<void> => {
    /* ---------- sessionStorage helpers ---------- */
    const productIdSequence: string[] =
      JSON.parse(sessionStorage.getItem("shuffledIDs") ?? "[]");

    const shuffledIndex = productIdSequence.indexOf(shoe.id);

    let productDetailsVersion: boolean[] =
      JSON.parse(sessionStorage.getItem("productdetailsVersion") ?? "[]");

    let lastValueRaw = sessionStorage.getItem("lastValue");
    let lastValue = lastValueRaw === null ? Math.random() < 0.5 : lastValueRaw === "true";

    if (typeof productDetailsVersion[shuffledIndex] !== "boolean") {
      lastValue = !lastValue;
      productDetailsVersion[shuffledIndex] = lastValue;
      sessionStorage.setItem("productdetailsVersion", JSON.stringify(productDetailsVersion));
      sessionStorage.setItem("lastValue", String(lastValue));
    }

    /* ---------- Firestore + navigation ---------- */
    try {
      const ref = doc(db, "users", userId);
      await setDoc(
        ref,
        {
          "Clicked Shop Now": arrayUnion(`${shoe.product_name} ${new Date().toISOString()}`),
        },
        { merge: true }
      );

      navigate(`/product?mode=${mode ?? ""}&product_id=${shoe.id}&userId=${userId}`);
    } catch (err) {
      console.error("Error during navigation or data update:", err);
    }
  };

  return (
    <div className="flex flex-col items-center text-center border-2 border-accent rounded-sm shadow-card min-h-[38rem] p-6 pb-16">
      <figure className="w-full aspect-[4/3] overflow-hidden mb-6">
        <img src={image} alt={shoe.product_name} className="object-cover w-full h-full" />
      </figure>

      <p className="text-xl font-bold mb-1">{shoe.product_name}</p>
      <p className="text-lg font-semibold text-price mb-6">{shoe.price}</p>

      <button
        onClick={handleClick}
        className="bg-primary text-white font-semibold text-lg px-6 py-2 rounded hover:bg-secondary hover:text-primary transition-colors"
      >
        Shop now
      </button>
    </div>
  );
};

export default Cell;
