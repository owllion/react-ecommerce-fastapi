import {
  FcAlphabeticalSortingZa,
  FcAlphabeticalSortingAz,
  FcSalesPerformance,
  FcClock,
} from "react-icons/fc";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoMdInfinite } from "react-icons/io";

export const sortOptions = [
  {
    name: "All",
    val: "all",
    icon: <IoMdInfinite />,
  },
  {
    name: "A-Z",
    val: "product_name-asc",
    icon: <FcAlphabeticalSortingAz />,
  },
  {
    name: "Z-A",
    val: "product_name-desc",
    icon: <FcAlphabeticalSortingZa />,
  },
  {
    name: "New-Old",
    val: "created_at-asc",
    icon: <FcClock />,
  },
  {
    name: "Old-New",
    val: "created_at-desc",
    icon: <FcClock />,
  },
  // {
  //   name: "High-Low",
  //   val: "sales-desc",
  //   icon: <FcSalesPerformance />,
  // },
  // {
  //   name: "Low-High",
  //   val: "sales-asc",
  //   icon: <FcSalesPerformance />,
  // },
  {
    name: "High-Low",
    val: "price-desc",
    icon: <MdOutlineAttachMoney />,
  },
  {
    name: "Low-High",
    val: "price-asc",
    icon: <MdOutlineAttachMoney />,
  },
];
