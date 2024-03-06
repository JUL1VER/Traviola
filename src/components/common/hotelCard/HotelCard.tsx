import { Link } from "react-router-dom";
import { Hotel } from "../../../helpers/types";
import { Typography } from "@mui/material";
import defaultHotel from "../../../assets/images/default-hotel.webp";
import star from "../../../assets/icons/star.svg";
import clsx from "clsx";
import s from "./hotelCard.module.scss";

interface Props {
  hotel: Hotel;
  className?: string;
}

const HotelCard = ({ hotel, className }: Props) => {
  return (
    <Link
      key={hotel.id}
      className={clsx(s.hotel, className)}
      to={`/hotel/${hotel.id}`}
      target="_blank"
    >
      <Typography variant="h4" className={s.name}>
        {hotel.name}
      </Typography>
      <Typography variant="body1" className={s.address}>
        {hotel.address}
      </Typography>
      {Boolean(hotel.phone_number) && (
        <a
          href={`tel:+${hotel.phone_number}`}
          target="_blank"
          className={s.phone}
        >
          <Typography variant="body1" className={s.phoneText}>
            Phone: {hotel.phone_number}
          </Typography>
        </a>
      )}
      {Boolean(hotel.hotel_rating) && (
        <div className={s.rating}>
          <Typography variant="body1" className={s.ratingNumber}>
            {hotel.hotel_rating}
          </Typography>
          <div
            style={{
              mask: `url(${star})`,
              maskSize: "cover",
            }}
            className={s.star}
          />
        </div>
      )}
      <img
        src={hotel.image ? hotel.image : defaultHotel}
        className={s.image}
        alt="Hotel photo"
      />
    </Link>
  );
};

export default HotelCard;
