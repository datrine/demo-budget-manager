import { Box, Text, CircularProgress } from "@chakra-ui/react";
import { getArc, getSecondEndpoints } from "../utils/fns";
export default function CatItemComponent({
  label,
  percentageOfBudget,
  amountSpent,
  amountBudgeted,
  iconUrl,
  color,
  stroke,
  breakdownModeProp,
  toggleBreakdownModeHook,
}: {
  label: string;
  percentageOfBudget: number;
  amountBudgeted: number;
  amountSpent: number;
  iconUrl: string;
  color: string;
  stroke: string;
  breakdownModeProp: string;
  toggleBreakdownModeHook: any;
}) {
  let percentageSpent: number = Math.round(
    (amountSpent * 100) / amountBudgeted
  );

  let angle = getArc(
    270,
    100,
    breakdownModeProp === "budget" ? percentageOfBudget : percentageSpent
  );
  let { x, y, largeArc, direction } = getSecondEndpoints(
    21,
    21,
    20,
    270,
    angle,
    20,
    20
  );

  return (
    <Box display={"flex"} justifyContent={"space-between"} w={"100%"} mb={3}>
      <Box width={"45%"} display={"flex"}>
        <Box mr={2}>
          {/*<CircularProgress /> */}

          <svg width="42" height="42" viewBox="0 0 42 42">
            <circle cx="20.0" cy="20.0" r="20" fill={color} />
            <image
              x={"13.0"}
              y={"13.0"}
              width={15}
              height={15}
              href={iconUrl}
            />
            <path
              d={`M 20 0 A 20 20 0 ${largeArc} ${direction} ${x} ${y}`}
              fill="none"
              stroke={stroke}
            />
          </svg>
        </Box>
        <Box
          onClick={(e) => {
            toggleBreakdownModeHook((prev:string) =>
              prev === "budget" ? "spend" : "budget"
            );
          }}
          fontSize={"14px"}
          lineHeight={"24px"}
          letterSpacing={"-0.5%"}
        >
          <Text textColor={"black"}>{label}</Text>
          {breakdownModeProp === "budget" ? (
            <>
              <Text>{percentageOfBudget}%</Text>
            </>
          ) : (
            <>
              <Text>{percentageSpent}%</Text>
            </>
          )}
        </Box>
      </Box>
      <Box width={"50%"} display={"flex"}>
        {
          <Text
            display={"flex"}
            width={"100%"}
            fontSize={"16px"}
            lineHeight={"30.5px"}
            letterSpacing={"-0.5%"}
            justifyContent={"flex-end"}
          >
            {breakdownModeProp === "spend" ? (
              <Text textColor={"black"}>₦{amountSpent}/</Text>
            ) : null}
            <Text>₦{amountBudgeted}</Text>
          </Text>
        }
      </Box>
    </Box>
  );
}
