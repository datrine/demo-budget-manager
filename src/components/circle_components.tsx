import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { getArc, getSecondEndpoints } from "../utils/fns";

export function HalfComponent() {
  return (
    <Box>
      <svg width="170" height="170" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M40 80 A35 35 0 1 0 110 80"
          fill="none"
          stroke="#B8CBDF"
          strokeWidth={"8px"}
        />

        <text
          x="75"
          y="95"
          text-anchor="middle"
          font-size="65.67px"
          strokeWidth={"10px"}
          fill="#B8CBDF"
        >
          ?
        </text>
      </svg>
    </Box>
  );
}

export function GeneralCircularComponent({
  fill,
  radius,
  data,
  fillArc = true,
  centerText,
  fillerInnerText,
  fillerOuterText,
  centerX = 150,
  centerY = 150,
  startX = 150,
  startY = 50,
  outerRing=false,
}: {
  data: any;
  radius: number;
  fill?: string;
  fillArc?: boolean;
  fillerInnerText?: string;
  fillerOuterText?: string;
  centerText?: string;
  centerX?: number;
  centerY?: number;
  startX?: number;
  startY?: number;
  outerRing?:boolean
}) {
  let arr = Array.from<any>(data.items);
  let arrCoords = Array.from<ArcProperties>([]);
  let total = Number(data.total);
  let currentItemTotal = Number(arr.reduce((a, b: any) => a + b.value, 0));
  let lastX = startX;
  let lastY = startY;
  let lastAngle = 270;

  for (const item of arr) {
    let angle = getArc(lastAngle, Number(total), item.value);
    let {
      x,
      y,
      largeArc,
      direction,
      xMid,
      yMid,
      yInner,
      xInner,
      xOuter,
      yOuter,
    } = getSecondEndpoints(
      startX,
      startY,
      radius,
      lastAngle,
      angle,
      centerX,
      centerY
    );

    arrCoords.push({
      startX: lastX,
      startY: lastY,
      endX: x,
      endY: y,
      stroke: item.stroke,
      largeArc,
      direction,
      angle,
      anglediff: angle - lastAngle,
      centerX,
      centerY,
      innerText: item.innerText,
      outerText: item.outerText,
      xMid,
      yMid,
      xInner,
      yInner,
      xOuter,
      yOuter,
      color: item.color
    });
    lastX = x;
    lastY = y;
    lastAngle = angle;
  }

  if (fillArc && data.total) {
    if (total > currentItemTotal) {
      let angle = getArc(lastAngle, total, total - currentItemTotal);
      let { x, y, largeArc, direction, yMid, xMid, yInner, xInner } =
        getSecondEndpoints(
          startX,
          startY,
          radius,
          lastAngle,
          angle,
          centerX,
          centerY
        );

      arrCoords.push({
        startX: lastX,
        startY: lastY,
        endX: x,
        endY: y,
        stroke: "#0466C866",
        largeArc,
        direction,
        angle,
        anglediff: angle - lastAngle,
        centerX,
        centerY,
        innerText: "",
        outerText: "",
        xMid,
        yMid,
      });
      lastX = x;
      lastY = y;
      lastAngle = angle;
    }
  }
  return (
    <>
      <svg width={300} height={300}>
        {arrCoords.map(
          (
            {
              startX,
              startY,
              endX,
              endY,
              stroke,
              largeArc,
              direction,
              innerText,
              outerText,
              anglediff,
              angle,
              xMid,
              yMid,
              xInner,
              yInner,
              xOuter,
              yOuter,color
            },
            index
          ) => (
            <React.Fragment key={index}>
              <PathComponent
                stroke={stroke}
                key={index}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                largeArc={largeArc}
                direction={direction}
                centerX={centerX}
                centerY={centerY}
                radius={radius}
                outerText={outerText}
                innerText={innerText}
                anglediff={anglediff}
                angle={angle}
                xMid={xMid}
                yMid={yMid}
                xInner={xInner}
                yInner={yInner}
                xOuter={xOuter}
                yOuter={yOuter}
                color={color!}
              />
            </React.Fragment>
          )
        )}
        <circle cx={`${centerX}`} cy={`${centerY}`} r={`${radius+9}`} fill="none"  strokeWidth="11px" 
        stroke={"#0466C866"} />
      </svg>
    </>
  );
}

export function PathComponent({
  centerX,
  centerY,
  startX,
  startY,
  endX,
  endY,
  stroke,
  color,
  largeArc,
  direction,
  radius,
  outerText,
  innerText,
  angle,
  anglediff,
  xMid,
  yMid,
  xInner,
  yInner,
  yOuter,
  xOuter,
  centerText,
}: {
  centerX: number;
  centerY: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stroke: string;
  color:string;
  largeArc: number;
  direction: number;
  radius: number;
  outerText?: string;
  innerText?: string;
  angle: number;
  anglediff: number;
  xMid?: number;
  yMid?: number;
  xInner?: number;
  yInner?: number;
  yOuter?: number;
  xOuter?: number;
  centerText?: string;
}) {
  let space = 50;
  return (
    <>
      <path
        d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} ${direction} ${endX} ${endY}`}
        fill="none"
        strokeWidth={"7px"}
        strokeLinecap="round"
        stroke={stroke}
      />
      <svg x={xInner} y={yInner}  width="17" height="17" viewBox="0 0 17 17">
        <circle cx="8.4" cy="8.4" r="8.4" fill={color} />
        <image x={"4.2"} y={"4.2"} href={innerText} />
      </svg>
      <text x={xOuter} y={yOuter} fill={stroke} fontWeight={"bold"} >
        {outerText}
      </text>
    </>
  );
}


interface ArcProperties {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stroke: string;
  color?: string;
  largeArc: number;
  direction: number;
  angle: number;
  anglediff: number;
  centerX: number;
  centerY: number;
  innerText?: string;
  outerText?: string;
  xMid: number;
  yMid: number;
  xInner?: number;
  yInner?: number;
  xOuter?: number;
  yOuter?: number;
}
