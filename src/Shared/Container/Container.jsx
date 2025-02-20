/* eslint-disable react/prop-types */
const Container = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:p-12 md:p-5 sm:p-2 p-4">
      {children}
    </div>
  );
};

export default Container;
