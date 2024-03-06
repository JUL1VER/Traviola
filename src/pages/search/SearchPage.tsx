import SearchForm from "../../features/searchForm/SearchForm";
import s from "./searchPage.module.scss";

const SearchPage = () => {
  return (
    <div className={s.root}>
      <SearchForm className={s.form} />
    </div>
  );
};

export default SearchPage;
