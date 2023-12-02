import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import CatItemComponent from "./cat_item";
export default function CatBreakdownComponent({toggleBreakdownModeHook,breakdownMode}:{toggleBreakdownModeHook:any,breakdownMode:any}) {
  let { budget } = useContext(BudgetCtx)!;
  if (budget.list.length<1) {
    return null;
  }
  return (
    <Box w={"100%"} mb={{base:10}} >
      <Text textColor={"black"} textAlign={"center"} >Category Breakdown</Text>
      {budget.list.map(({ amountBudgeted,amountSpent,category,iconUrl,color,stroke }, index) => (
        <CatItemComponent
          percentageOfBudget={(amountBudgeted * 100) / budget.totalAmount}
          amountSpent={amountSpent}
          label={category}
          amountBudgeted={amountBudgeted}
          key={index}
          color={color}
          stroke={stroke}
          iconUrl={iconUrl}
          toggleBreakdownModeHook={toggleBreakdownModeHook}
          breakdownModeProp={breakdownMode}
        />
      ))}
    </Box>
  );
}
