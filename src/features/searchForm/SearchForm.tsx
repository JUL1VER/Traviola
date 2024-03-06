import { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Destination, SearchFormData } from "../../helpers/types";
import GuestsPopover from "./guestsPopover/GuestsPopover";
import useSearchFormValidation from "../../hooks/useSearchFormValidation";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import s from "./searchForm.module.scss";

interface Props {
  className?: string;
}

const SearchForm = ({ className }: Props) => {
  const navigate = useNavigate();

  const [destinationsArray, setDestinationsArray] = useState<Destination[]>([]);
  const [formState, setFormState] = useState<SearchFormData>({
    destination: null,
    checkInDate: null,
    checkOutDate: null,
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfBabies: 0,
  });

  const validation = useSearchFormValidation(formState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validation.validateForm();

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        toast.error(error);
      });
    } else {
      if (formState.destination) {
        navigate(`/hotels?city=${encodeURIComponent(formState.destination)}`);
      }
    }
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      const destinationsData = await import("../../data/destinations.json");

      const uniqueNames = new Set();
      const uniqueDestinations = destinationsData.default.filter(
        (destination) => {
          if (!uniqueNames.has(destination.name)) {
            uniqueNames.add(destination.name);
            return true;
          }
          return false;
        }
      );

      setDestinationsArray(uniqueDestinations);
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={clsx(s.form, className)}>
        <Autocomplete
          disablePortal
          options={destinationsArray}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="City" />}
          onChange={(_event, newValue) => {
            setFormState((prevState) => ({
              ...prevState,
              destination: newValue?.name || null,
            }));
          }}
          className={s.city}
        />
        <DatePicker
          label="Check-in"
          value={formState.checkInDate}
          onChange={(date) =>
            setFormState((prevState) => ({ ...prevState, checkInDate: date }))
          }
          className={s.checkIn}
        />
        <DatePicker
          label="Check-out"
          value={formState.checkOutDate}
          onChange={(date) =>
            setFormState((prevState) => ({ ...prevState, checkOutDate: date }))
          }
          className={s.checkOut}
        />
        <GuestsPopover
          numberOfAdults={formState.numberOfAdults}
          setNumberOfAdults={(numberOfAdults) =>
            setFormState((prevState) => ({ ...prevState, numberOfAdults }))
          }
          numberOfChildren={formState.numberOfChildren}
          setNumberOfChildren={(numberOfChildren) =>
            setFormState((prevState) => ({ ...prevState, numberOfChildren }))
          }
          numberOfBabies={formState.numberOfBabies}
          setNumberOfBabies={(numberOfBabies) =>
            setFormState((prevState) => ({ ...prevState, numberOfBabies }))
          }
          className={s.guests}
        />
        <Button variant="contained" type="submit" className={s.submit}>
          Search
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default SearchForm;
