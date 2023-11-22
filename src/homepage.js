// import { AppContext } from "./context";
// import { useGlobalContext } from "./context";
import Search from "./Search";
import Movies from "./Movies";

const Homepage = () => {
  //local context hook
  //   const name = useContext(AppContext);
  //   const name = useGlobalContext();
  return (
    <>
      {/* <div>MY HOME PAGE</div> */}
      <Search />
      <Movies />
    </>
  );
};

export default Homepage;
