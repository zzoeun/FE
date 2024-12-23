import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import Detailed from "./pages/detailed";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
        <Route path="payment" element={<Payment />} />
        <Route path="detailed" element={<Detailed />} />
      </Routes>
    </>
  );
};

export default App;
export const fetchBookDetails = async () => {
  return {
    id: 1,
    title: "Le Grand Atlas des rois de France",
    author: "Jean Dupont",
    publisher: "Glénat",
    price: 64000,
    description:
      "This book offers a comprehensive guide to the kings of France, including their reigns, achievements, and the historical context of their time.",
  };
};
