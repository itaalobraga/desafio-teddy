import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Partners } from "./pages/partners";
import { About } from "./pages/about";
import { Companies } from "./pages/companies";
import { PanelLayout } from "./layouts/panel";
import { PartnersForm } from "./pages/partners/form";
import { CompaniesForm } from "./pages/companies/form";

export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PanelLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/:id?" element={<PartnersForm />} />
          <Route path="/partners/create" element={<PartnersForm />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id?" element={<CompaniesForm />} />
          <Route path="/companies/create" element={<CompaniesForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
