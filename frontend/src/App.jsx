import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/authentication/Register"
import { ToastContainer,  } from 'react-toastify';
import Login from "./pages/authentication/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
