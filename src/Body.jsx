/* eslint-disable react/prop-types */
import "./custom.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Inputs from "./Inputs";
import SignIn from "./Signin";
import { Fragment } from "react";

const url = "http://174.138.186.155:700/api/Account/register";

export default function Body() {
  const [email, setEmail] = useState("sa@gmail.com");

  const [firstName, setfirstName] = useState("hassany");
  const [lastName, setlastName] = useState("saidy");
  const [phoneNumber, setphoneNumber] = useState("0676986840");
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState("Hassany@2024");
  const [confirmPassword, setConfirmPassword] = useState("Hassany@2024");
  const [formData, setFormData] = useState({});
  const [submit, setSubmit] = useState(true);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);

  function handleEmail(value) {
    setEmail(() => value);
  }

  function handlePassword(value) {
    setPassword(() => value);
  }

  function handlefirstName(value) {
    setfirstName(() => value);
  }

  function handleVerifyPswd(value) {
    setConfirmPassword(() => value);
  }

  function addInputs(event) {
    event.preventDefault();
    setFormData(() => ({
      ...formData,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      role,
    }));
    setSubmit((val) => !val);
    console.log("executed");
  }

  useEffect(
    function () {
      async function fetchData() {
        try {
          const { data } = await axios.post(url, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { isSucceed, errorMessages, result } = data;

          if (isSucceed) {
            setResult(result);
            console.log("success");
            console.log(result);
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
    [submit, formData]
  );

  return (
    <div className="w-4/5 h-auto  border-2 border-bgfinwave mt-10 flex gap-2">
      <div className="h-full flex flex-col gap-2 items-center justify-center w-1/2 bg-mainfinwave">
        {result?.message && errors.length === 0 ? (
          <Fragment>
            <FaCheckCircle className="text-bgfinwave  text-6xl" />
            <h1 className=" text-xl text-bgfinwave font-bold ">
              {result?.message}
            </h1>
          </Fragment>
        ) : errors ? (
          <h1 className=" text-xl text-bgfinwave font-bold ">
            {"incorrect password or email"}
          </h1>
        ) : (
          <span className="loading loading-bars bg-bgfinwave loading-lg"></span>
        )}
      </div>

      <div className="h-full w-1/2 p-8 flex flex-col  border-l-0  border-2 border-bgfinwave items-center gap-2 justify-center  ">
        <h1 className=" text-3xl text-bgfinwave font-bold ">
          Welcome, {!isSignIn ? "Signin" : "Create account"}
        </h1>
        {!isSignIn ? (
          <SignIn
            handleEmail={handleEmail}
            email={email}
            handlePassword={handlePassword}
            password={password}
            errors={errors}
            setErrors={setErrors}
            setResult={setResult}
          />
        ) : (
          <Inputs
            handleEmail={handleEmail}
            email={email}
            handlePassword={handlePassword}
            password={password}
            handlefirstName={handlefirstName}
            firstName={firstName}
            handleVerifyPswd={handleVerifyPswd}
            confirmPassword={confirmPassword}
            addInputs={addInputs}
          />
        )}
      </div>
    </div>
  );
}
