import "./assets/css/tailwind.css";

import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 1,
    },
  },
});

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = React.lazy(() => import("./pages/Login"));
import Register from "./pages/Register";
import DashboardMain from "./pages/DashboardMain";
import ProductsAll from "./pages/ProductsAll";
import ProductNew from "./pages/ProductNew";
import ProductId from "./pages/Product";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import LowStockProducts from "./pages/LowStockProducts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardMain />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Home />} />
            <Route
              path="/login"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Login />
                </Suspense>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="products" element={<ProductsAll />} />
            <Route path="newProduct" element={<ProductNew />} />
            <Route path="lowStockProducts" element={<LowStockProducts />} />
            <Route path="products/:productId" element={<ProductId />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:categoryName" element={<Category />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer position="top-right" />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
