import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import englisch from "../../languages/english.json";
import TypeCheck from "../../services/typeCheck";

import loginImg from "../../assets/login.jpg";
import { FaArrowLeft } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/whoami")
      .then(async (res) => {
        if (!res.data.emailVerified) return navigate("/emailverification");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUsernameCheck = () => {
    let errs = new TypeCheck(username).isUsername();

    if (errs != null) return handleInputError(errs);

    axios
      .get("/api/auth/available/username", { params: { username } })
      .then((res) => {
        setUsernameAvailable(true);
        return true;
      })
      .catch((error) => {
        console.log(error);
        if (error.toJSON().message === "Network Error")
          return setError(englisch.errors.offline);

        switch (parseInt(error.response.status)) {
          case 400:
            setUsernameAvailable(false);
            setError(englisch.errors.username.length);
            break;
          case 409:
            setUsernameAvailable(false);
            setError(englisch.errors.username.unavailable);
            break;
          case 500:
            setError(englisch.errors["500"]);
            break;
        }
      });
  };

  const handleEmailCheck = () => {
    let errs = new TypeCheck(email).isEmail();

    if (errs != null) return handleInputError(errs);

    axios
      .get("/api/auth/available/email", { params: { email } })
      .then((res) => {
        setEmailAvailable(true);
      })
      .catch((error) => {
        //console.log(error);
        if (error.toJSON().message === "Network Error")
          return setError(englisch.errors.offline);

        switch (parseInt(error.response.status)) {
          case 400:
            setEmailAvailable(false);
            setError(englisch.errors.email.format);
            break;
          case 409:
            setEmailAvailable(false);
            setError(englisch.errors.email.unavailable);
            break;
          case 500:
            setError(englisch.errors["500"]);
            break;
        }
      });
  };

  const handleInputError = (er) => {
    if (er.where === "username" && er.error === "used") {
      return setUsernameAvailable(false);
    } else if (er.where === "email" && er.error === "used") {
      return setEmailAvailable(false);
    }

    setError(englisch.errors[er.where][er.error]);
  };

  const handlePasswordCheck = () => {
    let err = new TypeCheck(password).isPassword();

    if (err != null) return handleInputError(err);
  };

  const handleConfPasswordCheck = () => {
    if (password !== confPassword)
      setError(englisch.errors.confPassword.notEquals);
  };

  const handleRegister = () => {
    if (new TypeCheck(username).isUsername())
      return handleInputError(new TypeCheck(username).isUsername());

    if (new TypeCheck(email).isEmail())
      return handleInputError(new TypeCheck(email).isEmail());

    if (new TypeCheck(password).isPassword())
      return handleInputError(new TypeCheck(password).isPassword());

    if (password !== confPassword)
      return handleInputError({ where: "confPassword", error: "notEquals" });

    axios
      .post("/api/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        navigate("/emailverification");
      })
      .catch((error) => {
        if (error.toJSON().message === "Network Error")
          return setError(englisch.errors.offline);

        switch (parseInt(error.response.status)) {
          case 400:
          case 409:
            handleInputError(error.response.data);
            break;
          case 403:
            navigate("/dashboard");
            break;
          case 415:
            setError(englisch.errors["415"]);
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
            <label>Username</label>
            <input
              className="border p-2"
              type="text"
              value={username}
              onBlur={handleUsernameCheck}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>E-Mail</label>
            <input
              className="border p-2"
              type="text"
              value={email}
              onBlur={handleEmailCheck}
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
              onBlur={handlePasswordCheck}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Repeat Password</label>
            <input
              className="border p-2"
              type="password"
              value={confPassword}
              onBlur={handleConfPasswordCheck}
              onChange={(e) => {
                setConfPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <button
            type="button"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
            onClick={handleRegister}
          >
            Create Account
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to="/login"
              className="button"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FaArrowLeft size={20} />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
