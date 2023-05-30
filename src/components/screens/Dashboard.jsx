import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/whoami")
      .then((res) => {
        axios
          .get("/api/item/own")
          .then((res) => {
            setProperties(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert("something went wrong.");
          });
      })
      .catch((error) => {
        //console.log(error);
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    axios
      .delete("/api/auth/logout")
      .then((res) => navigate("/login"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto">
        <button
          type="button"
          className="border my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          onClick={() => navigate("/create")}
        >
          Create
        </button>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Thumbnail
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={p._id}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <img src={p.images.find((i) => i.thumbnail).data} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {p.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {p.description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {p.type}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {p.intended_price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="border my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
