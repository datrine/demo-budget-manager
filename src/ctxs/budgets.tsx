import React, { Dispatch, createContext, useState } from "react";
type Budget = {
  month: string;
  totalAmount: number;
  list: {
    category: string;
    amountBudgeted: number;
    amountSpent: number;
    color: string;
    iconUrl: string;
    value:string;
    stroke: string;
  }[];
};
type BudgetCtxType = {
  budget: Budget;
  updateBudgetCtx: React.Dispatch<React.SetStateAction<Budget>>;
};
export const BudgetCtx = createContext<BudgetCtxType | null>(null);

export default function BudgetCtxProvider({ children }: { children: any }) {
  let [budgetState, updateBudgetState] = useState<Budget>({
    month: "current",
    totalAmount: 0.0,
    list: [],
  });
  return (
    <BudgetCtx.Provider
      value={{ budget: budgetState, updateBudgetCtx: updateBudgetState }}
    >
      {children}
    </BudgetCtx.Provider>
  );
}
