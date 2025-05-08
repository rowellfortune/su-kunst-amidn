import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import Login from "./containers/Login.tsx";
import Signup from "./containers/Signup.tsx";
import NewOpencall from "./containers/opencall/NewOpencall.tsx";

export default function Links() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        {/* Finally, catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/opencall/new" element={<NewOpencall />} />
    </Routes>
  );
}