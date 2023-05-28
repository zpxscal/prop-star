import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/whoami").catch((error) => {
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
    <>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      First
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Last
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td class="whitespace-nowrap px-6 py-4">Mark</td>
                    <td class="whitespace-nowrap px-6 py-4">Otto</td>
                    <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                    <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td class="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                    <td class="whitespace-nowrap px-6 py-4">Larry</td>
                    <td class="whitespace-nowrap px-6 py-4">Wild</td>
                    <td class="whitespace-nowrap px-6 py-4">@twitter</td>
                  </tr>
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
    </>
  );
}

export default Dashboard;
