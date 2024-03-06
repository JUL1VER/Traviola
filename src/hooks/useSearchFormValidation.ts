import { SearchFormData } from "../helpers/types";

const useSearchFormValidation = (formData: SearchFormData) => {
  const validateForm = () => {
    const { destination, checkInDate, checkOutDate } = formData;

    const errorsList: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!destination) {
      errorsList.push("Please select a destination.");
    }

    if (!checkInDate) {
      errorsList.push("Please select a check-in date.");
    } else if (checkInDate < today) {
      errorsList.push(
        "Please select a valid check-in date. Check-in date cannot be in the past."
      );
    }

    if (!checkOutDate) {
      errorsList.push("Please select a check-out date.");
    } else if (checkInDate && checkOutDate <= checkInDate) {
      errorsList.push(
        "Please select a valid check-out date. Check-out date must be after check-in date."
      );
    } else if (checkOutDate < today) {
      errorsList.push("Check-out date cannot be in the past.");
    }

    return errorsList;
  };

  return { validateForm };
};

export default useSearchFormValidation;
