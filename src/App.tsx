import React, { Suspense } from "react";
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
import SplashPage from "./pages/SplashPage";
import PageLoader from "./components/common/PageLoader";
import { services } from "./data/services";
import { productsPageConfig } from "./data/library_configs";

// Lazy-loaded pages for code splitting
const TherapyPage = React.lazy(
  () => import("./pages/therapy_page/TherapyPage"),
);
const TrainingPage = React.lazy(
  () => import("./pages/training_page/TrainingPage"),
);
const ActivitiesPage = React.lazy(() => import("./pages/ActivitiesPage"));
const SchoolsPage = React.lazy(() => import("./pages/SchoolsPage"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const TrainingVideoLibraryPage = React.lazy(
  () => import("./pages/training_page/TrainingVideoLibraryPage"),
);
const TrainingArticlesLibraryPage = React.lazy(
  () => import("./pages/training_page/TrainingArticlesLibraryPage"),
);
const TherapyVideoLibraryPage = React.lazy(
  () => import("./pages/therapy_page/TherapyVideoLibraryPage"),
);
const TherapyArticlesLibraryPage = React.lazy(
  () => import("./pages/therapy_page/TherapyArticlesLibraryPage"),
);
const ArticlePDFViewerPage = React.lazy(
  () => import("./pages/ArticlePDFViewerPage"),
);
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = React.lazy(
  () => import("./pages/TermsOfServicePage"),
);
const AccessibilityPage = React.lazy(() => import("./pages/AccessibilityPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const PreQuestionnairePage = React.lazy(
  () => import("./pages/PreQuestionnairePage"),
);
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const UnsubscribePage = React.lazy(() => import("./pages/UnsubscribePage"));

const trainingService = services.find(
  (service) => service.path === "/training",
);

const therapyService = services.find((service) => service.path === "/therapy");

const activitiesService = services.find(
  (service) => service.path === "/activities",
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
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TrainingVideoLibraryPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/training-articles-library",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TrainingArticlesLibraryPage />
          </Suspense>
        ),
      },
      {
        path: ":articleKey",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArticlePDFViewerPage pageType="training" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/therapy-videos-library",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TherapyVideoLibraryPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/therapy-articles-library",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TherapyArticlesLibraryPage />
          </Suspense>
        ),
      },
      {
        path: ":articleKey",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArticlePDFViewerPage pageType="therapy" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/products",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductsPage config={productsPageConfig} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/privacy",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/terms",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsOfServicePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/accessibility",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AccessibilityPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ResetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "/settings",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/unsubscribe",
    element: (
      <Suspense fallback={<PageLoader />}>
        <UnsubscribePage />
      </Suspense>
    ),
  },
  {
    path: "/pq-k8x2m",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PreQuestionnairePage />
          </Suspense>
        ),
      },
    ],
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
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </TimerProvider>
        </LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
