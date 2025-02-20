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
      <GridLoader color="#115071" />
    </div>
  );
};

export default LodingSpinner;
