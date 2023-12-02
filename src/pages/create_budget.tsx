import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CreateBudgetView1 from "../components/view_1";
import CreateBudgetView2 from "../components/view_2";
import { useContext } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import { redirect } from "react-router-dom";
export default function CreateBudgetPage() {
  let { budget } = useContext(BudgetCtx)!;
  return (
    <Box>
      <Routes>
        <Route
          element={<CreateBudgetView2 />}
          path="/2"
          loader={async () => {
            console.log("CreateBudgetPage");
            if (!budget.totalAmount) {
              return redirect("/");
            }
          }}
        />
        <Route element={<CreateBudgetView1 />} path="/" />
      </Routes>
    </Box>
  );
}
