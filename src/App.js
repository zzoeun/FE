import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";

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
          <Route path="detail" element={<Detail />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
