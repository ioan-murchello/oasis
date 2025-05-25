import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon"; 
import { useDarkMode } from "../src/context/DarkModeCTX"; 

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    toggleDarkMode();
  };

  

  return (
    <ButtonIcon onClick={handleToggle}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
  
};
export default DarkModeToggle;
