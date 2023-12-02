import {
  Box,
  Text,
  Input,
  Image,
  Circle,
  Link as ChakraLink,Show
} from "@chakra-ui/react";
import imgUrl from "../assets/right-arrow.svg";
import leftImgUrl from "../assets/left-arrow.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BudgetCtx } from "../ctxs/budgets";
export default function CreateBudgetView1() {
  let {budget,updateBudgetCtx}=useContext(BudgetCtx)!
  let [amount,changeAmount]=useState(String(budget.totalAmount) )
  useEffect(()=>{
    if (amount) {
      budget.totalAmount =Number(amount) 
      updateBudgetCtx({...budget})
    }
  },[amount])
  return (
    <Box width={"100%"} backgroundColor={"#FCFCFC"}
      py={10}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"100vh"}
    >
      <Box w={"100%"}>
              <Box w={"100%"} mb={5} px={5} display={"flex"} justifyContent={"space-between"}>
        <ChakraLink
          as={ReactRouterLink}
          to={"/"}
        >
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
         <Text display={"inline"}>1</Text> <Text display={"inline"} textColor={"#707480"}>/3</Text>
        </Text>
      </Box>
      <Box width={["100%","500px"]} margin={["0px","auto"]}>
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
        <Box px={5}>
          {" "}
          <Text
            textColor={"#707480"}
            fontSize={"14px"}
            lineHeight={"20.3px"}
            letterSpacing={"-0.5%"}
          >
            How much would you like to budget for this month?
          </Text>
        </Box>
        <Box px={5}>
          <Input value={amount}
            variant={"flushed"}
            _placeholder={{ textColor: "#A8AFBF" }}
            placeholder="Amount (in ₦)" type={"number"}
            onChange={e=>{
              changeAmount(e.target.value )
            }}
          />
        </Box>
      </Box>
      </Box>


      <Box w={"100%"} px={5} display={"flex"} justifyContent={"space-between"}>
        <ChakraLink
          as={ReactRouterLink}
          to={"/"}
          borderBottomWidth={"1px"}
          borderBottomColor={"#67A2DC"}
        >
          <Text
            lineHeight={"21.84px"}
            textColor={"#67A2DC"}
            letterSpacing={"-0.5%"}
            size={"14px"}
          >
            Create from spending pattern
          </Text>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to={"./2"}
        >
        <Text textColor={"#0466C8"} fontWeight={"600"}>
          Next <Image display={"inline"} src={imgUrl} />
        </Text></ChakraLink>
      </Box>
    </Box>
  );
}
