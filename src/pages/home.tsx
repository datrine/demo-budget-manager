import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import CreateBudgetWidgetComponent from "../components/create_budget_widget";
import ProgressComponent from "../components/progress";
import TabMenuComponent from "../components/tab_menu";
import { useRef, useContext } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { BudgetCtx } from "../ctxs/budgets";
import CatBreakdownComponent from "../components/cat_breakdown";
import CreateOrShowBudgetWidgetComponent from "../components/create_budget_widget";
import Footer from "../components/footer";
export default function HomePage() {
  let { budget } = useContext(BudgetCtx)!;
  let { list, totalAmount } = budget;
  let amountSoFar =
    totalAmount - list.reduce((prev, cur) => prev + cur.amountBudgeted, 0);
  const { onToggle, onClose } = useDisclosure();
  let [isOpen, togglePopoverState] = useState(false);
  let ref = useRef<HTMLDivElement>(null);
  let dimensions = ref.current?.getBoundingClientRect();
  let [breakdownMode, toggleBreakdownMode] = useState<"budget" | "spend">(
    "budget"
  );
  let closePopover = (state:boolean) => {
    togglePopoverState(!state);
  };
  return (
    <Box
      backgroundColor={"#FCFCFC"}
      pt={10}
      width={{ base: "100%", md: "500px" }}
      margin={["0px", "auto"]}
    >
      <Text
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"36px"}
        letterSpacing={"-5%"}
        display={"block"}
        mb={10}
        w={"100%"}
        px={5}
      >
        Budget
      </Text>
      <Box display={"flex"} w={"100%"} alignItems={"center"} px={5} mb={5}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
          width={5}
          height={5}
          backgroundColor={"#0466C833"}
          mr={2}
        >
          <Text textAlign={"center"} textColor={"#0466C8"} fontWeight={"bold"}>
            ₦
          </Text>
        </Box>
        <Text textColor={"#707480"}>Monthly Budget</Text>
      </Box>
      <Box>
        <CreateOrShowBudgetWidgetComponent />
        <Box ref={ref} w={"100%"} px={5} zIndex={isOpen ? 0 : 200}>
          <TabMenuComponent
            activeTab={"this_month"}
            {...{ isOpen, onToggle, onClose }}
            toggleBreakdownModeHook={toggleBreakdownMode}
            breakdownMode={breakdownMode}
            closePopoverHook={closePopover}
          />
        </Box>

        {isOpen && dimensions ? (
          <Box
            backgroundColor={"rgba(251,251,251,0.8)"}
            style={{
              left: dimensions.left + window.scrollX,
              top: dimensions.top + window.scrollY,
              width: dimensions.width,
              height: dimensions.height,
              position: "fixed",
            }}
          ></Box>
        ) : null}
      </Box>
      <Footer />
    </Box>
  );
}
