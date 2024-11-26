import { useEffect, useState } from "react";
import { useAxiosInstance } from "./api/axiosInstance";
import { useAuth } from "./context/AuthContext";
const url = "Admin/users";
import Header from "./Header";

export default function Users() {
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState([]);
  const [click, setClick] = useState(false);
  const axiosInstance = useAxiosInstance();
  const { auth } = useAuth();

  console.log(axiosInstance);

  useEffect(
    function () {
      async function fetchData() {
        if (!click) return;
        try {
          const { data } = await axiosInstance.get(url);

          const { isSucceed, errorMessages, result } = data;

          if (isSucceed) {
            setResult(result);

            console.log("success");
            setErrors([]); // Clear any previous errors
          } else {
            setErrors(errorMessages);

            console.log("unsuccess");
          }
        } catch (error) {
          if (error.response) {
            // Server responded with a non-200 status
            setErrors(error.response.data.errorMessages || [error.message]);
          } else {
            // Network error or unexpected issue
            setErrors([error.message || "Network error occurred"]);
          }
        }
      }
      fetchData();
    },
    [click]
  );

  function handleClick() {
    setClick((val) => !val);
  }

  return (
    <>
      <Header />

      <div className="w-4/5  h-6 z-0 relative -top-40">
        {result === "" ? (
          <button
            className="btn btn-block  bg-bgfinwave text-textfinwave  hover:text-bgfinwave"
            onClick={handleClick}
          >
            Search user
          </button>
        ) : (
          ""
        )}
        <div className="overflow-x-auto">
          {result !== "" ? (
            <table className="table table-lg table-zebra border-b-bgfinwave ">
              <thead>
                <tr>
                  <th></th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>PhoneNumber</th>
                  <th>Role</th>
                  <th>UserName</th>
                </tr>
              </thead>
              <tbody>
                {result.map((user, index) => (
                  <tr key={user.id}>
                    <th>{index}</th>
                    <td>{index == 2 ? "" : user.firstName}</td>
                    <td>{index == 2 ? "" : user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td>{user.userName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
