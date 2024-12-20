import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </>
  );
};

export default App;
