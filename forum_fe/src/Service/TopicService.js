import axios from "axios";

const config = {
    Headers: { Authorization: "Bearer "+localStorage.getItem("token"),
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json"    
    }
}
class TopicService{
    getAllTopic(page){
        console.log(config.Headers.Authorization);
        return axios.get(`http://localhost:8080/topic/page=${page}`,config)
    }
}
export default new TopicService(); 