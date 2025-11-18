import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import About from "./about";
import SignIn from "./signin";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" replace />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

