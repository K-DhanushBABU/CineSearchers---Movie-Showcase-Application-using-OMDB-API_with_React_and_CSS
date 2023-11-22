import React, { useContext, useEffect, useState } from "react";

// context  api
// -> useContext(warehouse)
// -> RouterProvider(delivery agent)
//  ->consumer(jho data ko get kare apbe pas rake) as its lengthy they introduced -> (useContext() ->consumer)
//usecontext hook
//

export const API_KEY = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
//https://www.omdapi.com/? is fixed
//& is used as comma in url
//s == for search query // i== by id  //t==by title
//create an context
const AppContext = React.createContext();

//create an provider
const AppProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });

  const [Query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setisLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.Response === "True") {
        setisLoading(false);
        setMovie(data.Search);
        setIsError({
          show: false,
          msg: " ",
        });
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //only first time or one time it will run so array dependency is empty so now if i seasrch or change value in search box update the array dependency by passing new query

  //debouncing using setTimeOut and clearTimeOut
  useEffect(() => {
    let timerout = setTimeout(() => {
      getMovies(`${API_KEY}&s=${Query}`);
    }, 800);

    return () => clearTimeout(timerout);
  }, [Query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, Query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

//global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
