import axios from "axios"
import { useSelector } from "react-redux";

const InitializeAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  const TOKEN = useSelector((state) => state.studentAuth.token)
  if (TOKEN) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
  }
}

export default InitializeAxios