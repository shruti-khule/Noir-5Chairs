import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../services/firebase";
import parseUserAgent from "../services/deviceInfo";

/* ------------------------------------------------------------- */
/* Component props                                               */
/* ------------------------------------------------------------- */
interface LoginProps {
  /** Optional callback if the parent wants to react to a successful login */
  handleLogin?: (userId: string) => void;
}

/* ------------------------------------------------------------- */
/* Component                                                     */
/* ------------------------------------------------------------- */
const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const navigate = useNavigate();

  /* ---------- helpers ---------- */
  const validateUserId = (userId: string): string | null => {
    if (userId.length !== 4) return "User ID must be exactly 4 characters long.";

    const letters = userId.slice(0, 2);
    const numbers = userId.slice(2);

    if (!/^[A-Za-z]{2}$/.test(letters))
      return "The first two characters must be letters.";
    if (!/^\d{2}$/.test(numbers))
      return "The last two characters must be numbers.";

    return null;
  };

  /* ---------- form submit ---------- */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    /* Safer than e.target.title.value in TS */
    const formData = new FormData(e.currentTarget);
    const rawId = (formData.get("title") as string | null) ?? "";
    const userId = rawId.trim();

    const validationError = validateUserId(userId);
    if (validationError) {
      alert(validationError);
      return;
    }

    /* clear any previous session data */
    sessionStorage.clear();

    /* Firestore reference */
    const userRef = doc(db, "users", userId);

    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        alert(
          "This ID already exists. Please enter your initials + house number (e.g., LD15)",
        );
        return;
      }

      /* Store null placeholders for 5 product-detail versions */
      sessionStorage.setItem(
        "productdetailsVersion",
        JSON.stringify([null, null, null, null, null]),
      );

      const modeParam = new URLSearchParams(window.location.search).get("mode");

      /* Navigate first so the UI feels instant */
      navigate(`/home?mode=${modeParam}&userId=${userId}`);

      /* Optional parent callback */
      handleLogin?.(userId);

      /* Record user meta in Firestore */
      await setDoc(userRef, {
        userId,
        mode: modeParam,
        userAgent: parseUserAgent(), // whatever your helper returns
      });
    } catch (err) {
      console.error("Error accessing Firestore:", err);
    }
  };

  /* ---------- render ---------- */
  return (
    <div>
      <form
  onSubmit={handleSubmit}
  className="mx-auto my-20 flex flex-col items-center text-center gap-6"
>
  <label className="text-3xl font-bold">
    Please enter your response ID&nbsp;
    <small className="text-3xl font-bold">(initials + day of birth, e.g., LD03)</small>
  </label>

  <input
    required
    maxLength={4}
    name="title"
    type="text"
    className="border h-8 text-center"
  />

  <input
    type="submit"
    value="SUBMIT"
    className="mt-4 px-[2rem] py-[1rem]
    bg-[#6254F3] text-white
    rounded border border-transparent
    cursor-pointer
    hover:bg-[#0b5ed7]
    hover:border-[#0a58ca]
    hover:text-[#fff]
    transition-colors"
  />
</form>
    </div>
  );
};

export default Login;
