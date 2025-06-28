import React, { useEffect, useState } from "react";
import HeroSection from "../Components/LandingPage";
import ProductList from "../Components/ProductList";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../services/firebase";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
interface HomeProps {
  /** Optional ref you want forwarded down to <ProductList> */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const Home: React.FC<HomeProps> = ({ forwardedRef }) => {
  const params  = new URLSearchParams(window.location.search);
  const userId  = params.get("userId") ?? "";

  /* page-time tracking */
  const [pageStart, setPageStart]   = useState<number>(0);
  const [initial,   setInitial]     = useState<number>(0);

  /* Demo hero-section text */
  const heroData = {
    name: "Sunny",
    description: "This is a description for the home page",
  };

  /* Optional click logger you might pass to children */
  const handleClick = async (feature: string): Promise<void> => {
    try {
      await setDoc(
        doc(db, "users", userId),
        { "Clicked Feature": arrayUnion(`${feature} ${new Date().toISOString()}`) },
        { merge: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* --- mount --- */
  useEffect(() => {
    window.scrollTo(0, 0);

    setInitial(Number(sessionStorage.getItem("timeSpentOnHomePage") ?? "0"));
    setPageStart(Date.now());
  }, []);

  /* --- unmount --- */
  useEffect(() => {
    return () => {
      const elapsed = (Date.now() - pageStart) / 1_000;
      sessionStorage.setItem("timeSpentOnHomePage", String(initial + elapsed));
    };
  }, [pageStart, initial]);

  /* ---------------------------------------------------------------- */
  return (
    <>
      <Header />

      <HeroSection userId={userId} />

      <div className="pcontainer">
        <ProductList userId={userId} forwardedRef={forwardedRef} />
      </div>

      <Footer />
    </>
  );
};

export default Home;
