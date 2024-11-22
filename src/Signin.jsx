/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
const sigInUrl = "http://174.138.186.155:700/api/Account/login";

export default function Signin({ setErrors, setResult }) {
  const [email, setEmail] = useState("sa@gmail.com");
  const [password, setPassword] = useState("Hassany@2024");
  const [formData, setFormData] = useState({});
  const [submit, setSubmit] = useState(true);

  function handleEmail(value) {
    setEmail(() => value);
  }

  function handlePassword(value) {
    setPassword(() => value);
  }

  function addInputs(event) {
    event.preventDefault();
    setFormData(() => ({
      ...formData,
      email,
      password,
    }));
    setSubmit((val) => !val);
    console.log("executed");
  }

  useEffect(
    function () {
      async function fetchData() {
        try {
          const { data } = await axios.post(sigInUrl, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

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
    [submit, setErrors, setResult, formData]
  );

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => addInputs(e)}>
      <label className="input w-full input-ghost input-bordered border-2 border-bgfinwave flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
      </label>

      <label className="input input-ghost input-bordered w-full border-2 border-bgfinwave inline-flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          value={password}
          placeholder="password"
          onChange={(e) => handlePassword(e.target.value)}
        />
      </label>

      <button
        className="btn btn-block bg-bgfinwave text-textfinwave  hover:text-bgfinwave"
        type="submit"
      >
        Signin
      </button>
    </form>
  );
}
