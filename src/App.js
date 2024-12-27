import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import Detailed from "./pages/detailed";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signup" element={<Signup />} />
          <Route path="payment" element={<Payment />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="detailed" element={<Detailed />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
