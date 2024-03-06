import { useEffect, useState } from "react";

const useHotelPerPage = () => {
  const screenWidth = window.innerWidth;

  const defineHotelsValue = () => {
    return screenWidth <= 768
      ? 10
      : screenWidth <= 1024
      ? 9
      : screenWidth <= 1440
      ? 8
      : 10;
  };

  const startValue = defineHotelsValue();

  const [hotelPerPage, setHotelPerPage] = useState(startValue);

  useEffect(() => {
    const handleResize = () => {
      const newValue = defineHotelsValue();
      setHotelPerPage(newValue);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return hotelPerPage;
};

export default useHotelPerPage;
