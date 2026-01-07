import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoadingProvider } from "./contexts/LoadingContext";
import { TimerProvider } from "./contexts/TimerContext";
import { AuthProvider } from "./contexts/AuthContext";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import TherapyPage from "./pages/therapy_page/TherapyPage";
import TrainingPage from "./pages/training_page/TrainingPage";
import SchoolsPage from "./pages/SchoolsPage";
import ProductsPage from "./pages/ProductsPage";
import SplashPage from "./pages/SplashPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AccessibilityPage from "./pages/AccessibilityPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TrainingVideoLibraryPage from "./pages/training_page/TrainingVideoLibraryPage";
import TrainingArticlesLibraryPage from "./pages/training_page/TrainingArticlesLibraryPage";
import TherapyVideoLibraryPage from "./pages/therapy_page/TherapyVideoLibraryPage";
import TherapyArticlesLibraryPage from "./pages/therapy_page/TherapyArticlesLibraryPage";
import PageLoader from "./components/common/PageLoader";
import { services } from "./data/services";
import { productsPageConfig } from "./data/library_configs";

const trainingService = services.find(
  (service) => service.path === "/training"
);

const therapyService = services.find((service) => service.path === "/therapy");

const activitiesService = services.find(
  (service) => service.path === "/activities"
);

const schoolsService = services.find((service) => service.path === "/schools");

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
    children: [
      {
        index: true,
        element: (
          <PageLoader>
            <TherapyPage service={therapyService!} />
          </PageLoader>
        ),
      },
    ],
  },
  {
    path: "/training",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageLoader>
            <TrainingPage service={trainingService!} />
          </PageLoader>
        ),
      },
    ],
  },
  {
    path: "/activities",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageLoader>
            <ActivitiesPage service={activitiesService!} />
          </PageLoader>
        ),
      },
    ],
  },
  {
    path: "/schools",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageLoader>
            <SchoolsPage service={schoolsService!} />
          </PageLoader>
        ),
      },
    ],
  },
  {
    path: "/training-videos-library",
    element: <Layout />,
    children: [{ index: true, element: <TrainingVideoLibraryPage /> }],
  },
  {
    path: "/training-articles-library",
    element: <Layout />,
    children: [{ index: true, element: <TrainingArticlesLibraryPage /> }],
  },
  {
    path: "/therapy-videos-library",
    element: <Layout />,
    children: [{ index: true, element: <TherapyVideoLibraryPage /> }],
  },
  {
    path: "/therapy-articles-library",
    element: <Layout />,
    children: [{ index: true, element: <TherapyArticlesLibraryPage /> }],
  },
  {
    path: "/products",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsPage config={productsPageConfig} />,
      },
    ],
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
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  // Redirect any unknown routes to splash
  { path: "*", element: <Navigate to="/" replace /> },
]);

// Create a query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes default
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection (was cacheTime)
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <TimerProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </TimerProvider>
        </LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
