import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import clsx from "clsx";
import s from "./guestsPopover.module.scss";

interface Props {
  numberOfAdults: number;
  setNumberOfAdults: (value: number) => void;
  numberOfChildren: number;
  setNumberOfChildren: (value: number) => void;
  numberOfBabies: number;
  setNumberOfBabies: (value: number) => void;
  className?: string;
}

const GuestsPopover = ({
  numberOfAdults,
  setNumberOfAdults,
  numberOfChildren,
  setNumberOfChildren,
  numberOfBabies,
  setNumberOfBabies,
  className,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncrement = (
    setter: (value: number) => void,
    currentValue: number
  ) => {
    setter(currentValue + 1);
  };

  const handleDecrement = (
    setter: (value: number) => void,
    currentValue: number,
    min: number
  ) => {
    setter(Math.max(min, currentValue - 1));
  };

  const fields = [
    {
      label: "Adults",
      number: numberOfAdults,
      setter: setNumberOfAdults,
      minValue: 1,
    },
    {
      label: "Children",
      number: numberOfChildren,
      setter: setNumberOfChildren,
      minValue: 0,
    },
    {
      label: "Babies",
      number: numberOfBabies,
      setter: setNumberOfBabies,
      minValue: 0,
    },
  ];

  return (
    <div className={clsx(s.root, className)}>
      <Button
        aria-describedby={id}
        variant="outlined"
        type="button"
        onClick={handleClick}
        className={s.guests}
      >
        Guests
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {fields.map((field) => (
          <div className={s.wrapper} key={field.label}>
            <Typography variant="body1">{field.label}</Typography>
            <div>
              <IconButton
                onClick={() =>
                  handleDecrement(field.setter, field.number, field.minValue)
                }
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                display="inline"
                className={s.counter}
              >
                {field.number}
              </Typography>
              <IconButton
                onClick={() => handleIncrement(field.setter, field.number)}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </Popover>
    </div>
  );
};

export default GuestsPopover;
