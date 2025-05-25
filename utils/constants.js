import { BsCalendar3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiSettingsKnobs } from "react-icons/gi";
import { GrHome } from "react-icons/gr";
import { RiHotelBedFill } from "react-icons/ri";

export const PAGE_SIZE = 10;
export const LINKS = [
  {
    id: 1,
    text: "Home",
    icon: GrHome,
    path: "/dashboard",
  },
  {
    id: 2,
    text: "Bookings",
    icon: BsCalendar3,
    path: "/bookings",
  },
  {
    id: 3,
    text: "Rooms",
    icon: RiHotelBedFill,
    path: "/rooms",
  },
  {
    id: 4,
    text: "Users",
    icon: CgProfile,
    path: "/users",
  },
  {
    id: 5,
    text: "Settings",
    icon: GiSettingsKnobs,
    path: "/settings",
  },
];
