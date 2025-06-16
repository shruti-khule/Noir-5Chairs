import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import SecondHeader from "./Components/SecondHeader";
import Footer from "./Components/Footer";
import styled from "styled-components";
import data from "./data/product_data";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { db } from "./services/firebase";

const MoreinfoPositive = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.href,
    title: "MoreInfo Page",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("product_id");
  const userId = urlParams.get("userId");
  const product = data.find((product) => product.id == product_id) || {};
  const version = urlParams.get("isV");

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
    const data = {
      "Clicked Feature": arrayUnion(feature + " " + new Date()),
    };
    try {
      setDoc(ref, data, { merge: true });
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

        <h2>
          Material: Metal{" "}
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
          The {product.product_name} is made from high-quality metal, ensuring enhanced stability and durability.
        </p>
        <hr />

        <h2>
          Backrest: Reclining function included{" "}
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
          The {product.product_name} features a reclining backrest, allowing for a more ergonomic and flexible sitting posture.
        </p>
        <hr />

        <h2>
          Adjustable Seat Height: Included{" "}
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
          The {product.product_name} allows for adjustable seat height to suit different desk and body heights.
        </p>
        <hr />

        <h2>
        Safety Feature: Included{" "}
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
          A safety mechanism locks the wheels when the chair is unoccupied, keeping it securely in place when you stand up.
        </p>
        <hr />
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default MoreinfoPositive;
