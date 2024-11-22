import "./App.css";
import "./custom.css";
import Body from "./Body.jsx";
import Header from "./Header.jsx";

export default function App() {
  return (
    <div className=" w-full h-screen  bg-Bodyfinwave  flex flex-col items-center justify-center">
      <Header />
      <Body />
    </div>
  );
}
