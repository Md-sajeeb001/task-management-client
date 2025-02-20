/* eslint-disable react/prop-types */
import { GridLoader } from "react-spinners";

const LodingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
        flex 
        flex-col 
        justify-center 
        items-center `}
    >
      <GridLoader color="#d9af01" />
    </div>
  );
};

export default LodingSpinner;
