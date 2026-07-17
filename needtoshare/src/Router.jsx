import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Editor from "./Editor";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor/:code" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;