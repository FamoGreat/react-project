import { FaCheckCircle } from "react-icons/fa";
import { Fragment } from "react";

// eslint-disable-next-line react/prop-types
function Check({ isloading }) {
  return (
    <>
      <div className="w-screen h-screen  border-2 border-bgfinwave">
        <div className="h-full flex flex-col gap-2 items-center justify-center w-full bg-mainfinwave">
          {!isloading ? (
            <Fragment>
              <FaCheckCircle className="text-warning  text-6xl" />
              <h1 className=" text-2xl text-warning font-bold ">
                account created
              </h1>
            </Fragment>
          ) : (
            <span className="loading loading-spinner bg-warning loading-lg"></span>
          )}
        </div>
      </div>
    </>
  );
}

export default Check;
