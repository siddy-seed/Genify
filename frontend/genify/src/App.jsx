import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./about";
import SignIn from "./signin";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

