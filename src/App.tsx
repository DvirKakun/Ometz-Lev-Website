import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CoachingPage from "./pages/CoachingPage";
import TherapyPage from "./pages/TherapyPage";
import TrainingPage from "./pages/TrainingPage";
import SchoolsPage from "./pages/SchoolsPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
