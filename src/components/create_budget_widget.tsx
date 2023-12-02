import {
  Box,
  Text,
  Circle,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { BudgetCtx } from "../ctxs/budgets";
import { useContext, useState } from "react";
export default function CreateOrShowBudgetWidgetComponent() {
  let { budget, updateBudgetCtx } = useContext(BudgetCtx)!;
  let [btnState,toggle]=useState<"show"|"create">("create")
  let { totalAmount } = budget;
  return (
    <Box px={5} borderRadius={"5px"}>
      {btnState==="show" ?<ShowBudgetWidgetComponent toggleShowOrCreateHook={toggle}  />:
      <CreateBudgetWidgetComponent toggleShowOrCreateHook={toggle} />}
    </Box>
  );
}

export function CreateBudgetWidgetComponent({toggleShowOrCreateHook}:{toggleShowOrCreateHook:any}) {
  let { budget, updateBudgetCtx } = useContext(BudgetCtx)!;
  let { totalAmount } = budget;
  return (
      <Box
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        display={"flex"}
        px={5}
        backgroundColor={"white"}
        py={2}
        borderRadius={5}
        boxShadow={"0 5px 10px rgba(240, 240, 240, 0.3)"}
        onClick={e=>{
          toggleShowOrCreateHook("show")
        }}
      >
        <Text
          textColor={"#001233"}
          letterSpacing={"-0.5%"}
          fontSize={"16px"}
          lineHeight={"30.5px"}
          fontWeight={"600"}
        >
          Create a budget
        </Text>

        <ChakraLink as={ReactRouterLink} to={"/create_budget"}>
          <Circle
            size={"30px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#CADDF1"}
            textColor={"#0466C8"}
            fontSize={"25px"}
            alignSelf={"center"}
            pb={"5px"}
          >
            +
          </Circle>
        </ChakraLink>
      </Box>
  
  );
}

export function ShowBudgetWidgetComponent({toggleShowOrCreateHook}:{toggleShowOrCreateHook:any}) {
  let { budget, updateBudgetCtx } = useContext(BudgetCtx)!;
  let { totalAmount } = budget;
  return (
    <Box
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      display={"flex"}
      px={5}
      backgroundColor={"white"}
      py={2}
      borderRadius={5}
      boxShadow={"0 5px 10px rgba(240, 240, 240, 0.3)"}
      onClick={e=>{
        toggleShowOrCreateHook("create")
      }}
    >
      <Text
        textColor={"#001233"}
        letterSpacing={"-0.5%"}
        fontSize={"36px"}
        lineHeight={"30.5px"}
        fontWeight={"600"}
      >
        ₦{totalAmount}
      </Text>

    </Box>
  );
}
