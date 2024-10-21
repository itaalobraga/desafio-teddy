import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PanelLayout } from "./layouts/panel";
import { Partners } from "./pages/partners";
import { Home } from "./pages/home";

export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/panel" element={<PanelLayout />}>
          <Route path="/panel/" element={<Home />} />
          <Route path="/panel/partners" element={<Partners />} />
        </Route>
      </Routes>
    </Router>
  );
}
