import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Partners } from "./pages/partners";
import { About } from "./pages/about";
import { Companies } from "./pages/companies";
import { PanelLayout } from "./layouts/panel";

export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PanelLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/companies" element={<Companies />} />
        </Route>
      </Routes>
    </Router>
  );
}
