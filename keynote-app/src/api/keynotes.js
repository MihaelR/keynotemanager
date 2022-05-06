import axios from "axios";
//base axios file
export default axios.create({
  baseURL: "http://localhost:3001/",
});
