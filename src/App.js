import { Route, Routes } from 'react-router';
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
