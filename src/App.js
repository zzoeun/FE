import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
        <Route path="payment" element={<Payment />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
