import "./assets/css/tailwind.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardMain from "./pages/DashboardMain";
import ProductsAll from "./pages/ProductsAll";
import ProductNew from "./pages/ProductNew";
import ProductId from "./pages/Product";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/" element={<DashboardMain />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="products" element={<ProductsAll />} />
            <Route path="/products/new" element={<ProductNew />} />
            <Route path="products/:productId" element={<ProductId />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:categoryName" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
