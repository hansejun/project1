import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import InputSample from "../components/Test";
import Coin from "./Coin";
import Coins from "./Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/test" element={<InputSample />} />
        <Route path="/:coinId" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
