import {
  Box,
  Image,
  Circle,
  VStack,
  PopoverAnchor,
  Input,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useContext } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import minusMenuURL from "../assets/minus-menu.svg";
import { ItemCircularIcon } from "./item_circular_icon";
export default function DisplaySelectedItemsComponent({
  budgetOptsList,
  updateBudgetOptsListHook,
}: {
  updateBudgetOptsListHook: any;
  budgetOptsList: {
    label: string;
    img_url: string;
    color: string;
    value: string;
    canBeAdded: boolean;
  }[];
}) {
  const ctx = useContext(BudgetCtx)!;
  const { budget, updateBudgetCtx } = ctx;
  let deleteItem = (itemIndex: number) => {
    let deletedItems = budget.list.splice(itemIndex, 1);
    let deletedItem = deletedItems[0];
    updateBudgetCtx({ ...budget });
    let index = budgetOptsList.findIndex(
      (item) => item.value === deletedItem.value
    );
    budgetOptsList[index].canBeAdded = true;
    updateBudgetOptsListHook([...budgetOptsList]);
  };
  return (
    <Box w={["100%", "400px"]} mb={5}>
      {budget.list.map((_, index) => (
        <ItemToDisplayComponent
          key={index}
          itemId={index}
          deleteItemHook={deleteItem}
        />
      ))}
    </Box>
  );
}

function ItemToDisplayComponent({
  itemId,
  deleteItemHook,
}: {
  itemId: number;
  deleteItemHook: any;
}) {
  const ctx = useContext(BudgetCtx)!;
  const { budget, updateBudgetCtx } = ctx;
  let item = budget.list[itemId];
  let ref = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={ref}
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={2}
      _hover={{
        backgroundColor: "#0466C866",
      }}
      fontSize={"14px"}
      mb={"15px"}
    >
      <Text display={"flex"} alignItems={"center"}
          fontWeight={"bold"}>
        <ItemCircularIcon color={item?.color} img_url={item?.iconUrl} />
        <Text>{item?.category}</Text>{" "}
      </Text>
      <Box
        justifyContent={"space-between"}
        alignItems={"center"}
        display={"flex"}
      >
        <Text
          display={"flex"}
          mr={"10px"}
          fontSize={"14px"}
          letterSpacing={"-0.5%"}
          lineHeight={"24px"}
          fontWeight={"bold"}
          justifyContent={"space-between"}
          w={"100px"}
        >
          <Text>₦{item?.amountBudgeted}</Text>
          <Text>
            {Math.round((item?.amountBudgeted / budget?.totalAmount) * 100)}%
          </Text>
        </Text>
        <Circle
          size={"30px"}
          display={"flex"}
          justifyItems={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          borderRadius={"50%"}
          backgroundColor={"#979DAC33"}
          mr={"5px"}
          onClick={(e) => {
            deleteItemHook(itemId);
          }}
        >
          <Image src={minusMenuURL} />
        </Circle>
      </Box>
    </Box>
  );
}
