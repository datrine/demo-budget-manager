import {
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Button,
  VStack,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ProgressComponent from "./progress";
import CatBreakdownComponent from "./cat_breakdown";
export default function TabMenuComponent({
  activeTab,
  isOpen,
  onClose,
  onToggle,
  toggleBreakdownModeHook,
  breakdownMode,
  closePopoverHook,
}: {
  activeTab: string;
  isOpen: boolean;
  closePopoverHook: any;
  onClose: () => void;
  onToggle: () => void;
  breakdownMode: string;
  toggleBreakdownModeHook: any;
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={5}
      textColor={"#707480"}
      fontWeight={"600"}
      fontSize={"16px"}
      lineHeight={"30.5px"}
      letterSpacing={"-0.5%"}
    >
      <Tabs isFitted defaultIndex={1} w={"100%"}>
        <TabList flex={"display"} justifyContent={"space-between"} w={"100%"}>
          <Tab display={"flex"} justifyContent={"flex-start"}>
            <Text textAlign={"left"}>Last Month</Text>{" "}
          </Tab>
          <Tab
            justifyContent={"flex-start"}
            justifySelf={"center"}
            display={"flex"}
          >
            <Text textAlign={"center"}>This Month</Text>{" "}
          </Tab>
          <Box justifyContent={"flex-end"} display={"flex"}>
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Box verticalAlign={"middle"} zIndex={300} onClick={()=>{
                  closePopoverHook(isOpen)
                }}>
                  <Text>...</Text>
                </Box>
              </PopoverTrigger>
              <PopoverContent w={"fit-content"} zIndex={500}>
                <PopoverBody zIndex={300}>
                  <VStack w={"fit-content"} zIndex={300}>
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                      onClick={(e) => {
                        toggleBreakdownModeHook("spend");
                        closePopoverHook(true);
                      }}
                    >
                      <Box
                        borderRadius={"50%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"#0466C833"}
                        w={5}
                        h={5}
                        marginRight={2}
                        lineHeight={"15.6px"}
                        letterSpacing={"-0.5%"}
                      >
                        <Text textColor={"#0466C8"}>₦</Text>
                      </Box>
                      <Text fontSize={"12px"} fontWeight={"bold"}>
                        Expenses overview
                      </Text>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                      onClick={(e) => {
                        toggleBreakdownModeHook("budget");
                        closePopoverHook(true);
                      }}
                    >
                      <Box
                        borderRadius={"50%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"#0466C833"}
                        w={5}
                        h={5}
                        mr={2}
                        lineHeight={"15.6px"}
                        letterSpacing={"-0.5%"}
                      >
                        <Text textColor={"#0466C8"}>₦</Text>
                      </Box>
                      <Text fontSize={"12px"} fontWeight={"bold"}>
                        Category Overview
                      </Text>
                    </Box>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"100%"}
              flexDirection={"column"}
            >
              <ProgressComponent />
              <CatBreakdownComponent
                toggleBreakdownModeHook={toggleBreakdownModeHook}
                breakdownMode={breakdownMode}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
