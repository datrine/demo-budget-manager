import {
  Box,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Circle,
  VStack,
  PopoverAnchor,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useContext } from "react";
import { BudgetCtx } from "../ctxs/budgets";
import anchorURL from "../assets/anchor-down.svg";
import { ItemCircularIcon } from "./item_circular_icon";
export default function SelectComponent({
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
    stroke:string
  }[];
}) {
  const [isOpen, toggleOpenState] = useState(false);
  const { onToggle, onClose } = useDisclosure();
  const [selectedValue, changeSelectedValue] = useState("");
  let selecdValueInfo = budgetOptsList.find(
    (item) => item.value === selectedValue
  );
  let selectedItemIndex = budgetOptsList.findIndex(
    (item) => item.value === selectedValue
  );
  let setItemAsUnaddable = (itemIndex: number) => {
    budgetOptsList[itemIndex].canBeAdded = false;
    updateBudgetOptsListHook([...budgetOptsList]);
    changeSelectedValue("");
  };
  return (
    <Box mb={10}>
      <Box
        w={"250px"}
        borderRadius={"5px"}
        textAlign={"center"}
        boxShadow={" 0px 5px 10px 2px #00000008"}
        backgroundColor={"white"}
        mb={5}
      >
        <Popover
          returnFocusOnClose={true}
          isOpen={isOpen}
          onClose={onClose}
          closeOnBlur={true}
          matchWidth={true}
        >
          <PopoverTrigger>
            <Box
              onClick={() => {
                toggleOpenState(!isOpen);
              }}
            >
              {selectedValue ? (
                <Box
                  textColor={"#A8AFBF"}
                  display={"flex"}
                  w={"100%"}
                  justifyContent={"space-between"}
                  py={1}
                >
                  <Box textColor={"#A8AFBF"} display={"flex"}>
                    <ItemCircularIcon
                      img_url={selecdValueInfo?.img_url!}
                      color={selecdValueInfo?.color!}
                    />
                    <Text>{selecdValueInfo?.label}</Text>
                  </Box>

                  <Image src={anchorURL} display={"inline"} />
                </Box>
              ) : (
                <Box
                  textColor={"#A8AFBF"}
                  display={"flex"}
                  w={"100%"}
                  justifyContent={"space-between"}
                  py={1} px={1}
                >
                  <Text>Select Expense Category</Text>
                  <Image src={anchorURL} display={"inline"} />
                </Box>
              )}
            </Box>
          </PopoverTrigger>
          <PopoverContent w={"100%"} zIndex={500}>
            <PopoverBody width={"100%"}>
              <VStack w={"100%"} zIndex={300}>
                {budgetOptsList.map(
                  ({ img_url, label, value, color, canBeAdded }, index) => (
                    <SelectableItem
                      value={value}
                      label={label}
                      key={index}
                      img_url={img_url}
                      color={color}
                      canBeAdded={canBeAdded}
                      changeSelectedValueHook={changeSelectedValue}
                      closePopoverHook={(close: boolean) =>
                        toggleOpenState(!close)
                      }
                    />
                  )
                )}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      {selectedItemIndex === -1 ? null : (
        <SelectedAmountInputComponent
          budgetOptsList={budgetOptsList}
          itemIndex={selectedItemIndex}
          setItemAsUnaddableHook={setItemAsUnaddable}
        />
      )}
    </Box>
  );
}

function SelectableItem({
  img_url,
  label,
  value,
  color,
  changeSelectedValueHook,
  closePopoverHook,
  canBeAdded,
}: {
  closePopoverHook: any;
  img_url: string;
  label: string;
  value: string;
  color: string;
  changeSelectedValueHook: any;
  canBeAdded: boolean;
}) {

  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={2}
      _hover={{
        backgroundColor: "#0466C866",
      }}
      onClick={(e) => {
        if (canBeAdded) {
          changeSelectedValueHook(value);
          closePopoverHook(true);
        }
      }}
    >
      <ItemCircularIcon img_url={img_url} color={color} />
      <Box
        justifySelf={"stretch"}
        w={"100%"}
        verticalAlign={"middle"}
        textAlign={"start"}
        onKeyDown={(e) => {
          console.log(e);
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

export function SelectedAmountInputComponent({
  itemIndex,
  budgetOptsList,
  setItemAsUnaddableHook,
}: {
  itemIndex: number;
  setItemAsUnaddableHook: any;
  budgetOptsList: {
    label: string;
    img_url: string;
    color: string;
    value: string;
    canBeAdded: boolean;
    stroke: string;
  }[];
}) {
  const ctx = useContext(BudgetCtx)!;
  const { budget } = ctx;
  const [amount, updateAmount] = useState("");
  const [btnClicked, updateBtnClickState] = useState(false);
  let percentageOfBudget = Number(
    (Number(amount) / budget.totalAmount) * 100
  ).toFixed(2);
  let item = budgetOptsList[itemIndex];
  let amountBudgetable=budget.totalAmount-budget.list.reduce((acc, item) =>acc+item.amountBudgeted,0)
  return (
    <Box>
      <Box mb={10}>
        <Input placeholder="Amount (in ₦)" _placeholder={{textColor:"#A8AFBF"}}
          mb={10}
          lineHeight={"21.84px"}
          fontSize={"14px"}
          letterSpacing={"-0.5%"}
          value={amount}
          variant={"flushed"}
          type={"number"}
          onChange={(e) => {
            updateAmount(e.target.value);
          }}
        />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {!isNaN(Number(itemIndex)) && Number(itemIndex) > -1 ? (
            <Text textColor={"#0466C8"}>
              % of budget: {percentageOfBudget}%
            </Text>
          ) : null}
          <Circle
            backgroundColor={"#0466C833"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            display={"flex"}
            size={"40px"}
            onClick={(e) => {
              if (amount) {
                let sanitizedAmount = Number(amount);
                if (isNaN(sanitizedAmount)) {
                  return console.log("Unsanitized amount: " + amount);
                }
                if (sanitizedAmount>amountBudgetable) {
                  return console.log("amount larger than budget remaining: " + amountBudgetable);
                }
                let list = budget.list;
                let amountSpent = Math.round(Math.random() * sanitizedAmount);
                list.push({
                  amountBudgeted: sanitizedAmount,
                  category: item.label,
                  color: item.color,
                  iconUrl: item.img_url,
                  value: item.value,
                  amountSpent,
                  stroke:item.stroke
                });
                setItemAsUnaddableHook(itemIndex);
                updateBtnClickState(true);
              }
            }}
          >
            +
          </Circle>
        </Box>
      </Box>
    </Box>
  );
}
