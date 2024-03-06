import { AppRoutes } from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <AppRoutes />
      </div>
    </LocalizationProvider>
  );
}

export default App;
