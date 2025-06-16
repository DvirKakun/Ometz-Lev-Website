import { BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import HomePage from "./pages/HomePage";
// import CoachingPage from "./pages/CoachingPage";
// import TherapyPage from "./pages/TherapyPage";
// import TrainingPage from "./pages/TrainingPage";
// import SchoolsPage from "./pages/SchoolsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/20">
        <Layout>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/coaching" element={<CoachingPage />} />
            <Route path="/therapy" element={<TherapyPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/schools" element={<SchoolsPage />} /> */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
