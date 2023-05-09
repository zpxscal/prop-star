import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import englisch from "../../languages/english.json";
import TypeCheck from "../../services/typeCheck";

import loginImg from "../../assets/login.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/whoami")
      .then(async (res) => {
        if (!res.data.emailVerified) return navigate("/emailverification");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogin = () => {
    if (
      new TypeCheck(email).isEmail() != null ||
      new TypeCheck(password).isPassword() != null
    ) {
      return setError(englisch.errors.wrong_login_data);
    }

    axios
      .post("/api/auth/login", {
        password,
        email,
        remember,
      })
      .then((res) => {
        if (!res.data.emailVerified) return navigate("/emailverification");
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.toJSON().message === "Network Error")
          return setError(englisch.errors.offline);

        switch (parseInt(err.response.status)) {
          case 400:
          case 401:
          case 415:
            setError(englisch.errors.wrong_login_data);
            break;
          case 403:
            navigate("/dashboard");
            break;
          case 500:
            setError(englisch.errors["500"]);
            break;
        }
      });
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
          <div className="flex flex-col py-2">
            <label>E-Mail</label>
            <input
              className="border p-2"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setRemember(!remember);
            }}
          >
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" checked={remember} />{" "}
              Remember Me
            </p>
            <div className="mr-2 flext items-center">
              {" "}
              <Link to="/forgotPwd" className="button">
                Forgot password
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#00df9a] border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/register" className="button">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
