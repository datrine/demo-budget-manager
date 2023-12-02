import foodImgUrl from "../assets/budgets/budget-food.svg";
import foodImgCircleUrl from "../assets/circle_data/food.svg";
import savingsImgUrl from "../assets/budgets/budget-savings.svg";
import clothImgUrl from "../assets/budgets/budget-cloth.svg";
import carImgUrl from "../assets/budgets/budget-car.svg";
import repairImgUrl from "../assets/budgets/budget-repairs.svg";
import callImgUrl from "../assets/budgets/budget-call.svg";
export const budgetOptsList = [
  {
    label: "Foods and Drinks",
    img_url: foodImgUrl,
    color: "#F4E9CD",
    stroke: "#C89104",
    value: "foods_drinks",
    canBeAdded: true,
  },
  {
    label: "Savings",
    img_url: savingsImgUrl,
    color: "#038A3933",
    stroke:"#038A39",
    value: "savings",
    canBeAdded: true,
  },
  {
    label: "Clothes",
    img_url: clothImgUrl,
    color: "#5A04C833",
    stroke:"#5A04C8",
    value: "cloth",
    canBeAdded: true,
  },
  {
    label: "Transportation",
    img_url: carImgUrl,
    color: "#04A5C833",
    stroke:"#04A5C8",
    value: "transportation",
    canBeAdded: true,
  },
  {
    label: "Phone Calls",
    img_url: callImgUrl,
    color: "#C8046233",
    stroke:"#C80462",
    value: "phone_call",
    canBeAdded: true,
  },
  {
    label: "Repairs",
    img_url: repairImgUrl,
    color: "#CADDF1",
    stroke:"#0466C8",
    value: "repairs",
    canBeAdded: true,
  },
];
