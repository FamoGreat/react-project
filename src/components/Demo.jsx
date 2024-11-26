/* eslint-disable react/prop-types */
import "../custom.css";
import { useEffect, useReducer } from "react";
import axios from "axios";
import SignIn from "../Signin";
import Header from "../Header";
import Check from "../Check";

const url = "http://174.138.186.155:700/api/Account/register";

const initialStates = {
  email: "kigamboni@gmail.com",
  pswd: "Kigali@20",
  firstName: "hassanali",
  lastName: "said",
  phoneNumber: "0776986840",
  confirmpswd: "kigali@20",
  role: 3,
  formData: "",
  status: {
    isSignIn: false,
    result: "",
    isloading: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setFirstName":
      return { ...state, firstName: action.payload };
    case "setPswd":
      return { ...state, pswd: action.payload };
    case "setConfirmPswd":
      return { ...state, confirmpswd: action.payload };
    case "setFormData":
      return {
        ...state,
        formData: {
          firstName: state.firstName,
          lastName: state.lastName,
          phoneNumber: state.phoneNumber,
          email: state.email,
          password: state.pswd,
          confirmPassword: state.confirmpswd,
          role: state.role,
        },
      };

    case "setResult":
      return {
        ...state,
        status: { ...state.status, result: action.payload },
      };
    case "loading":
      return {
        ...state,
        status: { ...state.status, isloading: action.payload },
      };
    default:
      throw new Error(`Unknown action: ${action?.type}`);
  }
}

export default function Demo() {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const { email, pswd, formData, status } = state; // Destructuring state here
  console.log(pswd);
  const { result, errors, isloading } = { ...status }; // Destructuring status here

  function handleEmail(value) {
    dispatch({ type: "setEmail", payload: value });
  }

  function handlePassword(value) {
    dispatch({ type: "setPswd", payload: value });
  }

  useEffect(
    function () {
      if (formData.length < 1) return; // Skip if there's no query

      const controller = new AbortController(); // Create an AbortController instance
      const { signal } = controller;

      async function fetchData() {
        try {
          dispatch({ type: "loading", payload: true });
          console.log(true);
          const { data } = await axios.post(url, formData, { signal });
          const { isSucceed, result } = data;

          if (isSucceed) {
            dispatch({ type: "setResult", payload: result });
            dispatch({ type: "loading", payload: false });
            console.log("success");
            console.log(result);
          } else {
            console.log("unsuccess");
          }
        } catch (error) {
          if (error.response) {
            console.log("here");
            dispatch({ type: "loading", payload: false });
            // Server responded with a non-200 statu
          } else {
            console.log("and here");
            // Network error or unexpected issue
          }
        }
      }
      fetchData();
      // Cleanup function to cancel the request
      return () => controller.abort();
    },
    [formData]
  );

  return (
    <>
      <Header />
      <div className="w-screen h-auto  border-2 border-bgfinwave mt-10 flex gap-2">
        <Check isloading={isloading} />

        <div className="h-full w-1/2 p-8 flex flex-col  border-l-0  border-2 border-bgfinwave items-center gap-2 justify-center  ">
          <h1 className=" text-3xl text-bgfinwave font-bold ">
            Welcome,Signin
          </h1>

          <SignIn
            handleEmail={handleEmail}
            email={email}
            handlePassword={handlePassword}
            pswd={pswd}
            errors={errors}
            dispatch={dispatch}
          />
        </div>
      </div>
    </>
  );
}
