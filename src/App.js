import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";
import CartPage from "./components/mypage/CartPage";

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
          <Route path="detail/:bookId" element={<BookDetail />} />
          <Route path="/mypage/cartpage" element={<CartPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
