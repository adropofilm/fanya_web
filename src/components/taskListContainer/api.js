import axios from "axios";

export const getAllTasksFromApi = async () => {
    return await axios.get(`${process.env.REACT_APP_API_HOST}/tasks`)
      .then((response) => {
        if(response.status === 200) return response.data;
        else throw new Error(`HTTP response: ${response.status}`)
      })
};