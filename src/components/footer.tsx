import { Box, Show } from "@chakra-ui/react";
import FooterMenu from "./footer_menu";
import budgetIcon from "../assets/footer/budgets.svg";
import chatIcon from "../assets/footer/chats.svg";
import homeIcon from "../assets/footer/home.svg";
import reportsIcon from "../assets/footer/reports.svg";
import profileIcon from "../assets/footer/profile.svg";
export default function Footer() {
  return (
    <Show below={"md"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        px={2}
        py={2}
        position={"fixed"}
        bottom={0}
        w={"100vw"}
        backgroundColor={"white"}
      >
        {footerMenuList.map(({ label, link, iconUrl }, index) => (
          <FooterMenu to={link} icon={iconUrl} label={label} key={index} />
        ))}
      </Box>
    </Show>
  );
}

let footerMenuList = [
  { value: "home", label: "Home", iconUrl: homeIcon, link: "" },
  { value: "reports", label: "Reports", iconUrl: reportsIcon, link: "" },
  { value: "chats", label: "Chats", iconUrl: chatIcon, link: "" },
  { value: "budget", label: "Budget", iconUrl: budgetIcon, link: "" },
  { value: "profile", label: "Profile", iconUrl: profileIcon, link: "" },
];
