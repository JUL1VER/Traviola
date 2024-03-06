import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import logo from "../../../assets/icons/travioli-logo.svg";
import clsx from "clsx";
import s from "./header.module.scss";

const Header = () => {
  return (
    <div className={clsx(s.root, s["container"])}>
      <div className={s.wrapper}>
        <Link to="/">
          <div
            className={s.logo}
            style={{
              mask: `url(${logo})`,
              maskSize: "cover",
            }}
          />
        </Link>
      </div>
      <Typography variant="h1" className={s.title}>
        TRAVIOLI
      </Typography>
    </div>
  );
};

export default Header;
