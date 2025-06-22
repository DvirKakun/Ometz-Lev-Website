import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import TherapyPage from "./pages/TherapyPage";
import TrainingPage from "./pages/TrainingPage";
import SchoolsPage from "./pages/SchoolsPage";
import SplashPage from "./pages/SplashPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AccessibilityPage from "./pages/AccessibilityPage";
import { services } from "./data/services";

const trainingService = services.find(
  (service) => service.path === "/training"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />, // Welcome splash screen at root
  },
  {
    path: "/home",
    element: <Layout />, // Main layout with header + footer
    children: [
      { index: true, element: <HomePage /> }, // Main home page at /home
    ],
  },
  {
    path: "/therapy",
    element: <Layout />,
    children: [{ index: true, element: <TherapyPage /> }],
  },
  {
    path: "/training",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TrainingPage service={trainingService} />,
      },
    ],
  },
  {
    path: "/activities",
    element: <Layout />,
    children: [{ index: true, element: <ActivitiesPage /> }],
  },
  {
    path: "/schools",
    element: <Layout />,
    children: [{ index: true, element: <SchoolsPage /> }],
  },
  {
    path: "/privacy",
    element: <Layout />,
    children: [{ index: true, element: <PrivacyPolicyPage /> }],
  },
  {
    path: "/terms",
    element: <Layout />,
    children: [{ index: true, element: <TermsOfServicePage /> }],
  },
  {
    path: "/accessibility",
    element: <Layout />,
    children: [{ index: true, element: <AccessibilityPage /> }],
  },
  // Redirect any unknown routes to splash
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
