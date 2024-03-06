import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Hotel } from "../../helpers/types";
import { Typography } from "@mui/material";
import s from "./hotelsPage.module.scss";
import HotelCard from "../../components/common/hotelCard/HotelCard";
import useHotelPerPage from "../../hooks/useHotelPerPage";

const HotelsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(0);
  const loader = useRef(null);

  const hotelsPerPage = useHotelPerPage();

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelsData = await import("../../data/hotels.json");

      const filteredHotels = hotelsData.default.filter(
        (hotel) => hotel.city === city
      );

      setTimeout(() => {
        const nextHotels = filteredHotels.slice(0, (page + 1) * hotelsPerPage);
        setHotels(nextHotels);
        setHasMore(nextHotels.length < filteredHotels.length);
        setLoading(false);
      }, 1000);
    };

    fetchHotels();
  }, [city, page, hasMore, hotelsPerPage]);

  useEffect(() => {
    const loaderElement = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className={s.root}>
      {loading ? (
        <Typography variant="body1" className={s.loader}>
          Loading...
        </Typography>
      ) : hotels.length ? (
        <>
          <Typography variant="h3" className={s.resultTitle}>
            Choose available hotel in {city}:
          </Typography>
          <div className={s.hotelsWrapper}>
            {hotels.map((hotel) => (
              <HotelCard hotel={hotel} key={hotel.id} />
            ))}
          </div>
          <div ref={loader} className={s.loadingMore}>
            {hotels.length && !loading && hasMore && (
              <Typography>Loading more...</Typography>
            )}
          </div>
        </>
      ) : (
        <Link to="/" className={s.goBack}>
          <Typography variant="body1" className={s.noHotels}>
            No hotels found. Click to go back to main page.
          </Typography>
        </Link>
      )}
    </div>
  );
};

export default HotelsPage;
