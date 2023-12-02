import {
    Image,
    Circle,
  } from "@chakra-ui/react";

 export function ItemCircularIcon({ img_url, color }: { img_url: string; color: string }) {
    return (
      <Circle
        size={"30px"}
        display={"flex"}
        justifyItems={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        borderRadius={"50%"}
        backgroundColor={color}
        mr={"5px"}
      >
        <Image src={img_url} />
      </Circle>
    );
  }
  