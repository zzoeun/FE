import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
        <Route path="payment" element={<Payment />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
