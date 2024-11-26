import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import "./custom.css";
import Demo from "./components/Demo.jsx";
import Users from "./Users.jsx";
import PageNotFound from "./PageNotFound.jsx";
import HomePage from "./HomePage.jsx";
import Signup from "./Signup.jsx";
import Check from "./Check.jsx";

export default function App() {
  return (
    <div className=" w-full h-screen  bg-Bodyfinwave  flex flex-col items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="demo" element={<Demo />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route index element={<Signup />} />
          <Route path="check" element={<Check />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
