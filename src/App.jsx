import { Map } from "./components/map";
import { Results } from "./components/results";
import { Search } from "./components/search";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Search />
      <Results />
      <Map />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          duration: 3000,
        
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 12px",
          },
        }}
      />
    </>
  );
}

export default App;
