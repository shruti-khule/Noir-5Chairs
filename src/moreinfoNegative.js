import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import SecondHeader from "./Components/SecondHeader";
import Footer from "./Components/Footer";
import styled from "styled-components";
import data from "./data/product_data";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";

const MoreinfoNegative = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.href,
    title: "MoreInfo Page",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("product_id");
  const userId = urlParams.get("userId");
  const version = urlParams.get("isV");
  const product = data.filter((product) => product.id == product_id)[0] || {};

  const [openFeaturesMaterial, setOpenFeaturesMaterial] = useState(false);
  const [openFeaturesBackrest, setOpenFeaturesBackrest] = useState(false);
  const [openFeaturesSeatHeight, setOpenFeaturesSeatHeight] = useState(false);
  const [openFeaturesSafety, setOpenFeaturesSafety] = useState(false);

  const [pageStartTime, setPageStartTime] = useState(0);
  const [initalTimeSpent, setInitalTimeSpent] = useState(0);

  const handleJetztKaufenClick = (data) => {
    const ref = doc(db, "users", userId);
    try {
      setDoc(
        ref,
        { "Clicked Jetzt Kaufen": arrayUnion(data) },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitalTimeSpent(
      parseInt(
        sessionStorage.getItem(
          "timeSpentOnProductDetailsPage_" + product.product_name
        )
      ) || 0
    );
    setPageStartTime(Date.now());
  }, []);

  useEffect(() => {
    return () => {
      const pageEndTime = Date.now();
      const timeSpentInSeconds = (pageEndTime - pageStartTime) / 1000;
      sessionStorage.setItem(
        "timeSpentOnProductDetailsPage_" + product.product_name,
        initalTimeSpent + timeSpentInSeconds
      );
    };
  }, [pageStartTime]);

  const handleClick = (feature) => {
    const ref = doc(db, "users", userId);
    const dataLog = {
      "Clicked Feature": arrayUnion(feature + " " + new Date()),
    };
    try {
      setDoc(ref, dataLog, { merge: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="secondHeader">
        <SecondHeader
          userId={userId}
          onClickJetztKaufen={handleJetztKaufenClick}
          product_id={product_id}
          version={version}
          timeData={false}
        />
      </div>

      <div id="top" className="moreinfopage">
        <hr />
        <h1>Product Details </h1>
        <hr />

        {/* Material */}
        <h2>
          Material: Plastic{" "}
          {openFeaturesMaterial ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesMaterial(!openFeaturesMaterial);
                handleClick("Material");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesMaterial(!openFeaturesMaterial);
                handleClick("Material");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesMaterial ? "block" : "none" }}>
          The {product.product_name} is made from standard plastic.
        </p>
        <hr />

        {/* Backrest */}
        <h2>
          Backrest: No reclining function{" "}
          {openFeaturesBackrest ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesBackrest(!openFeaturesBackrest);
                handleClick("Backrest");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesBackrest(!openFeaturesBackrest);
                handleClick("Backrest");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesBackrest ? "block" : "none" }}>
          The {product.product_name} does not offer a reclining backrest.
        </p>
        <hr />

        {/* Adjustable Seat Height */}
        <h2>
          Adjustable Seat Height: Not included{" "}
          {openFeaturesSeatHeight ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesSeatHeight(!openFeaturesSeatHeight);
                handleClick("Adjustable Seat Height");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesSeatHeight(!openFeaturesSeatHeight);
                handleClick("Adjustable Seat Height");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesSeatHeight ? "block" : "none" }}>
          The {product.product_name} does not offer adjustable seat height.
        </p>
        <hr />

        {/* Safety Feature */}
        <h2>
          Safety Feature: Not included{" "}
          {openFeaturesSafety ? (
            <AiOutlineUp
              size={25}
              onClick={() => {
                setOpenFeaturesSafety(!openFeaturesSafety);
                handleClick("Safety Feature");
              }}
            />
          ) : (
            <AiOutlineDown
              size={25}
              onClick={() => {
                setOpenFeaturesSafety(!openFeaturesSafety);
                handleClick("Safety Feature");
              }}
            />
          )}
        </h2>
        <p style={{ display: openFeaturesSafety ? "block" : "none" }}>
          The {product.product_name} does not include a safety mechanism (e.g., wheel lock).
        </p>
        <hr />
      </div>

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default MoreinfoNegative;
