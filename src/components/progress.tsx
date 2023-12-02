import {
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import { GeneralCircularComponent, HalfComponent } from "./circle_components";

export default function ProgressComponent() {
  let { budget } = useContext(BudgetCtx)!;
  let { list, totalAmount } = budget;
  let amountSoFar =
    totalAmount - list.reduce((prev, cur) => prev + cur.amountBudgeted, 0);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {budget.list.length > 0 ? (
          <GeneralCircularComponent
            data={{
              items: budget.list.map(
                ({
                  amountBudgeted,
                  amountSpent,
                  stroke,color,
                  category,
                  iconUrl,
                }) => ({
                  value: amountBudgeted,
                  stroke: stroke,
                  color:color,
                  outerText: `${Math.round(
                    (amountBudgeted / budget.totalAmount) * 100
                  )}%`,
                  innerText: iconUrl,
                })
              ),
              total: budget.totalAmount,
            }}
            fill="none"
            fillArc={false}
            radius={100}
            //centerX={200}
            //centerY={200}
          />
        ) : (
          <CircularProgress
            color={"#0466C866"}
            value={100}
            size={150}
            thickness={"7px"}
          >
            <CircularProgressLabel>{<HalfComponent />}</CircularProgressLabel>
          </CircularProgress>
        )}
        <Text
          textAlign={"center"}
          fontSize={"14px"}
          textColor={"#707480"}
          width={"50%"}
        >
          {!amountSoFar
            ? "You haven’t created a budget for this month yet"
            : `₦${amountSoFar}/₦${totalAmount}`}
        </Text>
      </Box>
    </Box>
  );
}
