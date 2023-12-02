import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import CreateBudgetPage from "./pages/create_budget";
import BudgetCtxProvider from "./ctxs/budgets";

function App() {
  const [page, changePage] = useState("home");
  return (
    <>
          <BudgetCtxProvider>
      <BrowserRouter basename="/">
        <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<CreateBudgetPage />} path="/create_budget/*" />
        </Routes>
      </BrowserRouter>
          </BudgetCtxProvider>{" "}
    </>
  );
}

export default App;
