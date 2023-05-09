import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import englisch from "../../languages/english.json";

import loginImg from "../../assets/login.jpg";

export default function VertificationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/whoami")
      .then(async (res) => {
        if (res.data.emailVerified) navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  const handleResend = async () => {
    axios
      .get("/api/auth/emailverification")
      .then((res) => {
        setError("Email got resent.");
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again later.");
      });
  };

  const handleSubmit = async () => {
    if (code.replace("-", "").length !== 6)
      return setError(englisch.errors.emailVerificationCode.format);

    if (!/^[A-Z0-9-]{0,7}$/i.test(code))
      return setError(englisch.errors.emailVerificationCode.format);

    axios
      .put("/api/auth/emailverification", { code })
      .then((res) => navigate("/dashboard"))
      .catch((error) => {
        console.log(error);
        if (error.toJSON().message === "Network Error")
          return setError(englisch.errors.offline);

        switch (parseInt(error.response.status)) {
          case 400:
            handleInputError(error.response.data);
            break;
          case 401:
            navigate("/login");
            break;
          case 403:
            setSuccess(true);
            break;
          case 500:
            setError(englisch.errors["500"]);
            break;
        }
      });
  };

  const handleInputError = (er) => {
    setError(englisch.errors[er.where][er.error]);
  };

  const handleInput = (e) => {
    if (!/^[A-Z0-9-]{0,7}$/i.test(e.target.value)) return;

    if (e.target.value.replace("-", "").length > 6) return;

    setCode(e.target.value);

    if (e.target.value.replace("-", "").length === 6) handleSubmit();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="text-4xl font-bold text-center py-6">PROP-STAR.</h2>
          {error && <p className="text-red-600 text-center w-full">{error}</p>}
          <p className="text-center p-2">
            We have sent you an email containing a code. Please verify it by
            entering the code below.
          </p>
          <div className="flex flex-col py-2">
            <label>Code</label>
            <input
              className="border p-2 font-bold"
              type="text"
              placeholder="XXX-XXX"
              style={{ textTransform: "uppercase" }}
              value={code}
              onChange={(e) => {
                handleInput(e);
                setError("");
              }}
            />
            <p
              className="text-center w-full cursor-pointer"
              onClick={handleResend}
            >
              Resend Code
            </p>
            <button
              type="button"
              className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to="/register"
              className="button"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FaArrowLeft size={20} />
              Back to Create Account
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
