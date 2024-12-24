import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import Detailed from "./pages/Detailed";
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
        c4322c08b8a311beba69f0a57f4979a26ef014c6
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
