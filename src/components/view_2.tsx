import {
  Box,
  Text,
  Select,
  Image,
  Circle,
  Link as ChakraLink,
} from "@chakra-ui/react";
import imgUrl from "../assets/right-arrow.svg";
import leftImgUrl from "../assets/left-arrow.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import { budgetOptsList } from "../utils/budget_opt_list";
import SelectComponent from "./select_comp";
import DisplaySelectedItemsComponent from "./display_select_comp";
export default function CreateBudgetView1() {
  let { budget, updateBudgetCtx } = useContext(BudgetCtx)!;
  let [budgetOptsListState, updateBudgetOptsListState] =
    useState(budgetOptsList);
  let percentageOfBudgetRemaing = Math.round(
    ((budget.totalAmount -
      budget.list.reduce((prev, item) => prev + item.amountBudgeted, 0)) /
      budget.totalAmount) *
      100
  );
  return (
    <Box
      backgroundColor={"#FCFCFC"}
      pt={10}
      py={10}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"calc(100vh-5em)"}
      mb={5}
    >
      <Box w={"100%"}>
        <Box
          w={"100%"}
          mb={5}
          px={5}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <ChakraLink as={ReactRouterLink} to={"/create_budget"}>
            <Text
              lineHeight={"21.84px"}
              textColor={"#67A2DC"}
              letterSpacing={"-0.5%"}
              size={"14px"}
            >
              <Image display={"inline"} src={leftImgUrl} />
            </Text>
          </ChakraLink>
          <Text fontWeight={"600"}>
            <Text display={"inline"}>2</Text>{" "}
            <Text display={"inline"} textColor={"#707480"}>
              /3
            </Text>
          </Text>
        </Box>
        <Box w={["100%","500px"]} margin={["0px","auto"]} >
          <Box px={5} pb={5}>
            <Text
              fontSize={"28px"}
              lineHeight={"36px"}
              letterSpacing={"5%"}
              fontWeight={700}
            >
              Create new budget
            </Text>
          </Box>
          <Box px={5} mb={5}>
            {" "}
            <Text
              textColor={"#707480"}
              fontSize={"14px"}
              lineHeight={"20.3px"}
              letterSpacing={"-0.5%"}
            >
              How much would you like to spend on each category this month?
            </Text>
          </Box>
          <Box
            px={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            w={"100%"}
          >
            <SelectComponent
              budgetOptsList={budgetOptsListState}
              updateBudgetOptsListHook={updateBudgetOptsListState}
            />

            <DisplaySelectedItemsComponent
              budgetOptsList={budgetOptsList}
              updateBudgetOptsListHook={updateBudgetOptsListState}
            />
          </Box>
        </Box>
      </Box>

      <Box w={"100%"} backgroundColor={"white"} position={"fixed"} bottom={0} pt={2} pb={5} px={5} display={"flex"} justifyContent={"space-between"}>
        <Text>% of budget remaining : {percentageOfBudgetRemaing}%</Text>
        <ChakraLink as={ReactRouterLink} to={"/"}>
          <Text textColor={"#0466C8"} fontWeight={"600"}>
            Done <Image display={"inline"} src={imgUrl} />
          </Text>
        </ChakraLink>
      </Box>
    </Box>
  );
}
