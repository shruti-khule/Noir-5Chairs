import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import product_card from "../data/product_data";
import ProductDisplay from "../Components/ProductDisplay";
import Footer from "../Components/Footer";
import Videosection from "../Components/Videosection";
import SecondHeader from "../Components/SecondHeader";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";
import { Product, TimeData } from "../types/types";


/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const SingleProduct: React.FC = () => {
  /* ---------- query-params ---------- */
  const params = new URLSearchParams(window.location.search);
  const product_id = Number(params.get("product_id"));   // NaN if missing
  const [mode, setMode]     = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  /* ---------- product & timing state ---------- */
  const [product, setProduct] = useState<Product | null>(null);
  const [pageStartTime, setPageStartTime] = useState<number>(0);
  const [initialTimeSpent, setInitialTimeSpent] = useState<number>(0);

  const [upperSectionStart, setUpperSectionStart] = useState<number | null>(null);
  const [timeSpentUpper,     setTimeSpentUpper]   = useState<number>(0);
  const [timeData,           setTimeData]         = useState<TimeData | null>(null);

  /* ---------- "version" flag ---------- */
  const version = useMemo(() => {
    const seen   = sessionStorage.getItem("productdetailsVersion");
    const order  = sessionStorage.getItem("shuffledIDs");
    if (!seen || !order || !product) return undefined;

    const seenArr  = JSON.parse(seen)  as boolean[];
    const orderArr = JSON.parse(order) as (number | string)[];
    const idx = orderArr.indexOf(product.id);
    return idx > -1 ? seenArr[idx] : undefined;
  }, [product]);

  /* ---------------------------------------------------------------- */
  /* One-time mount logic                                             */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    window.scrollTo(0, 0);

    setMode(params.get("mode"));
    setUserId(params.get("userId"));

    setPageStartTime(Date.now());

    const found = product_card.find((p) => p.id === product_id) as Product | undefined;
    setProduct(found ?? null);

    if (found) {
      const prev = Number(
        sessionStorage.getItem(`timeSpentOnSingleProductPage_${found.product_name}`) ?? "0",
      );
      setInitialTimeSpent(prev);
    }
  }, [product_id]);

  /* ---------------------------------------------------------------- */
  /* Persist total time on page when unmounting                       */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    return () => {
      if (!product) return;

      const elapsed = (Date.now() - pageStartTime) / 1_000;
      sessionStorage.setItem(
        `timeSpentOnSingleProductPage_${product.product_name}`,
        String(initialTimeSpent + elapsed),
      );
    };
  }, [pageStartTime, initialTimeSpent, product]);

  /* ---------------------------------------------------------------- */
  /* Hover-tracking for "presentation / upper" section                */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const upper = document.querySelector<HTMLDivElement>(".uppersection");
    const single = document.querySelector<HTMLDivElement>(".single-product-page");
    const header = document.querySelector<HTMLDivElement>(".secondHeader");

    const start = () => setUpperSectionStart(Date.now());
    const stop  = () => {
      if (!upperSectionStart) return;
      const delta = (Date.now() - upperSectionStart) / 1_000;
      setTimeSpentUpper((prev) => prev + delta);
    };

    if (upper) {
      upper.addEventListener("mouseenter", start);
      if (mode !== "1") upper.addEventListener("mouseleave", stop);
    }
    if (mode === "1" && single && header) {
      single.addEventListener("mouseenter", stop);
      header.addEventListener("mouseenter", stop);
    }

    return () => {
      upper?.removeEventListener("mouseenter", start);
      if (mode !== "1") upper?.removeEventListener("mouseleave", stop);

      if (mode === "1" && single && header) {
        single.removeEventListener("mouseenter", stop);
        header.removeEventListener("mouseenter", stop);
      }
    };
  }, [upperSectionStart, mode]);

  /* ---------------------------------------------------------------- */
  /* When upper-section time changes, prepare the payload             */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (product)
      setTimeData({ productName: product.product_name, timeSpentInUpperSection: timeSpentUpper });
  }, [timeSpentUpper, product]);

  /* ---------------------------------------------------------------- */
  /* Firestore "Jetzt kaufen" logger                                  */
  /* ---------------------------------------------------------------- */
  const handleJetztKaufenClick = async (log: string): Promise<void> => {
    if (!userId) return;
    try {
      await setDoc(
        doc(db, "users", userId),
        { "Clicked Jetzt Kaufen": arrayUnion(log) },
        { merge: true },
      );
    } catch (err) {
      console.error("Firestore error (Jetzt Kaufen):", err);
    }
  };

  /* ---------------------------------------------------------------- */
  if (!product) return <div>Loading…</div>;

  /* ---------------------------------------------------------------- */
  return (
    <section>
      <div className="secondHeader">
        <SecondHeader
          userId={userId ?? ""}
          onClickJetztKaufen={handleJetztKaufenClick}
          product_id={String(product_id)}
          version={version}
          timeData={timeData ?? undefined}
        />
      </div>

      {/* Debug line you had – remove if no longer needed */}
      {/* {JSON.stringify(timeData)} */}

      <div className="uppersection">
        <h1 className="upperSectionHeading">{product.product_name}</h1>

        {mode === "2" ? (
          <Videosection userId={userId ?? ""} product={product} />
        ) : (
          <iframe
            className="ARiframe"
            src={`https://ar-chair-viewer.vercel.app/?model=${product.sku}`}
            title="AR Chair Viewer"
            frameBorder={0}
            width={950}
            height={750}
            allow="camera; microphone; fullscreen; xr-spatial-tracking"
          />
        )}
      </div>

      <div className="single-product-page">
        <ProductDisplay
          userId={userId ?? ""}
          product={{
            ...product,
            id: String(product.id),
            product_name: product.product_name,
            farbe: product.farbe,
          }}
          mode={mode ?? undefined}
          timeData={timeData ?? { productName: product.product_name, timeSpentInUpperSection: 0 }}
        />
      </div>

      <Footer />
    </section>
  );
};

export default SingleProduct;


const Wrapper = styled.section`
  .container {
    padding: 9rem 3.2rem;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .3dmodel-wrapper {
    margin: auto;
  }
  .ARiframe {
    margin-top: 2rem;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

