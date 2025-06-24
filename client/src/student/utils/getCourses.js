import axios from "axios";

const getCoursesData = async () => {
    let queryStr = `page=1`
    try {
        let response = await axios.get(`/web/course/get?${queryStr}`);
        console.log('response.data.data.courses',response.data.data.courses)
        return  {data:response.data.data.courses};
    } catch (error) {
        console.log(`error ${error}`);
        return [];
    }
}

export default getCoursesData;