import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import createImg from "../../assets/create.jpg";
import LocationPicker from "../common/LocationPicker";
import Picker from "../common/Picker";
import english from "../../languages/english.json";
import TypeCheck from "../../services/typeCheck";

export default function Create() {
  const LAST_PART = 1;
  const [part, setPart] = useState(0);
  const [tumbnail, setTumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/whoami")
      .then((res) => {})
      .catch((error) => {
        //console.log(error);
        //navigate("/login");
      });
    axios
      .get("/api/item/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNextPart = () => {
    if (part < LAST_PART) setPart((part) => part + 1);
  };

  const handleBackPart = () => {
    if (part > 0) setPart((part) => part - 1);
  };

  const handleSubmit = () => {
    let err = [];
    err.push(new TypeCheck(tumbnail, "link").isLink());
    err.push(new TypeCheck(title, "title").isTitle());
    err.push(new TypeCheck(description, "description").isTitle());
    err.push(new TypeCheck(location, "location").isLocation());
    err.push(new TypeCheck(price, "price").isPrice());

    if (!types.includes(type))
      err.push({ where: "itemtype", error: "invalid" });

    err = err.filter((e) => e != null);

    if (err.length) return showErrors(err);

    axios
      .post("/api/item/create", {
        title,
        type,
        description,
        price,
        tumbnail,
        location,
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.toJSON().message === "Network Error")
          return setError(english.errors.offline);

        switch (parseInt(error.response.status)) {
          case 400:
            showErrors(error.response.data);
            break;
          case 403:
            if (!error.response.data.emailVerified)
              return navigate("/emailverification");

            navigate("/login");
            break;
          case 500:
            setError(english.errors["500"]);
            break;
        }
      });
  };

  const showErrors = (errors) => {
    if (errors.length === 0) return;

    if (typeof errors[0] === "string") return setError(errors[0]);

    setError(english.errors[errors[0].where][errors[0].error]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-full w-full">
      <div className="hidden sm:block w-full h-full max-h-screen">
        <img className="w-full h-full object-cover" src={createImg} alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="text-4xl font-bold text-center py-6">Create PROP.</h2>
          {error && <p className="text-red-600 text-center w-full">{error}</p>}
          {part === 0 && (
            <>
              <div className="flex flex-col py-2">
                <label>tumbnail URL</label>
                <input
                  className="border p-2"
                  type="url"
                  value={tumbnail}
                  onChange={(e) => {
                    setTumbnail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="flex flex-col py-2">
                <label>Title</label>
                <input
                  className="border p-2"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="flex flex-col py-2">
                <label>Description</label>
                <textarea
                  className="border p-2"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                ></textarea>
              </div>
            </>
          )}
          {part === 1 && (
            <>
              <div className="flex flex-col py-2">
                <label>Intended Price</label>
                <input
                  className="border p-2"
                  value={price}
                  type="number"
                  onChange={(e) => {
                    try {
                      if (e.target.value === "") setPrice(0);
                      else if (parseFloat(e.target.value) > 0)
                        setPrice(parseFloat(e.target.value));
                    } catch (e) {}
                    setError("");
                  }}
                />
              </div>
              <Picker
                label="Type"
                placeholder="Property Type"
                selected={type}
                options={types}
                onSelect={(t) => setType(t)}
              />
              <div className="flex flex-col py-2">
                <label>Address</label>
                <LocationPicker
                  onSelect={(loc) =>
                    setLocation({
                      ...loc,
                      lng: parseFloat(loc.lon),
                      lat: parseFloat(loc.lat),
                    })
                  }
                />
              </div>
            </>
          )}
          {part === 0 && (
            <button
              type="button"
              className="bg-[#00df9a] border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
              onClick={handleNextPart}
            >
              Next
            </button>
          )}
          {part === 1 && (
            <div className="w-full flex items-center gap-4">
              <button
                type="button"
                className="bg-[#00df9a] border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={handleBackPart}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-[#00df9a] border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
