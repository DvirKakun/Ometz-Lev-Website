import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CoachingPage from "./pages/CoachingPage";
import TherapyPage from "./pages/TherapyPage";
import TrainingPage from "./pages/TrainingPage";
import SchoolsPage from "./pages/SchoolsPage";
import SplashPage from "./pages/SplashPage";

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
    children: [{ index: true, element: <TrainingPage /> }],
  },
  {
    path: "/coaching",
    element: <Layout />,
    children: [{ index: true, element: <CoachingPage /> }],
  },
  {
    path: "/schools",
    element: <Layout />,
    children: [{ index: true, element: <SchoolsPage /> }],
  },
  // Redirect any unknown routes to splash
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
