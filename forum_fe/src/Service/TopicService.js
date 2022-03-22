import axios from "axios";
const token=localStorage.getItem("token");
class TopicService{
    getAllTopic(page){
        return axios(
            {
                url:`topic/page=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
}
export default new TopicService(); 