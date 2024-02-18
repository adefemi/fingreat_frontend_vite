import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/hoc/protectedRoute";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Index";
import Accounting from "./pages/Account/Index";
import SignIn from "./pages/Auth/SignIn";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/accounting" element={<Accounting />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
