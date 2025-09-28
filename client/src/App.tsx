import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/api/tasks");
    console.log(response.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return <></>;
}

export default App;
