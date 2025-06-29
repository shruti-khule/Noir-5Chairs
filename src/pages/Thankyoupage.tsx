/* Thankyoupage.tsx */
import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../services/firebase";

/* ------------------------------------------------------------------ */
/* Optional: extract query-param helpers                              */
/* ------------------------------------------------------------------ */
const useQuery = () => new URLSearchParams(window.location.search);

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const ThankYouPage: React.FC = () => {
  const params   = useQuery();
  const userId   = params.get("userId");          // string | null
  const mode     = params.get("mode");            // string | null
  const version  = params.get("isV");             // string | null

  /* -------------------------------------------------------------- */
  /* Persist accumulated session-storage timers to Firestore        */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!userId) return;                           // guard against null

    const ref = doc(db, "users", userId);

    const timeSpentData: Record<string, unknown> = {};
    let totalSingle  = 0;
    let totalDetails = 0;

    Object.keys(sessionStorage).forEach((key) => {
      const val = Number(sessionStorage.getItem(key)) || 0;

      if (key.startsWith("timeSpentOnSingleProductPage"))   totalSingle  += val;
      if (key.startsWith("timeSpentOnProductDetailsPage"))  totalDetails += val;

      timeSpentData[key] = val;
    });

    timeSpentData.totalTimeSpentOnSingleProductPage = totalSingle;
    if (totalDetails > 0)
      timeSpentData.totalTimeSpentOnProductDetailsPage = totalDetails;

    setDoc(ref, timeSpentData, { merge: true })
      .catch((err) => console.error("Firestore write error:", err))
      .finally(() => sessionStorage.clear());
  }, [userId]);

  /* -------------------------------------------------------------- */
  /* Qualtrics redirect map                                         */
  /* -------------------------------------------------------------- */
  const getSurveyLink = (): string | null => {
    const map: Record<string, Record<string, string>> = {
      "1": {
        true:  "https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_9KqiwjwTldUzzTg",
        false: "https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_6MapWG93aPGf6vk",
      },
      "2": {
        true:  "https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_8B9rcM6t3RSO3Fc",
        false: "https://unikoelnwiso.eu.qualtrics.com/jfe/form/SV_dbPKlLmNV1dv7AG",
      },
    };

    // version can be "true" | "false" | null
    return mode && version ? map[mode]?.[version as "true" | "false"] ?? null : null;
  };

  /* -------------------------------------------------------------- */
  return (
    <div className="pb-32">
      <div className="h-20 w-full bg-secondary" />
  
      <section className="mb-40 text-center mt-10">
        <h2 className="text-[95px] text-primary-blue mt-[8rem] font-semibold mb-8">Thank You.</h2>
  
        {getSurveyLink() && (
          <h3 className="text-[30px]">
            Now,&nbsp;
            <a href={getSurveyLink()!} className="underline text-primary-blue">
              please follow this link to return to the survey.
            </a>
          </h3>
        )}
      </section>
  
      <Footer />
    </div>
  );
};

export default ThankYouPage;