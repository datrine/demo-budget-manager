import { Box, Link as ChakraLink, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
export default function FooterMenu({
  icon,
  label,
  to,
}: {
  icon: any;
  label: any;
  to?: any;
}) {
  return (
    <Box>
      <ChakraLink as={ReactRouterLink} to={"/"}>
        <React.Fragment>
          <Box textAlign={"center"} ><Image src={icon} display={"inline"} /></Box>
          <Box onClick={to}>
            <Text></Text>
            {label}
          </Box>
        </React.Fragment>
      </ChakraLink>
    </Box>
  );
}
