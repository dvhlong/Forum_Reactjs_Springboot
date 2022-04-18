import axios from "axios";
class TopicService{
    getAllTopic(page){
        return axios(
            {
                url:`topic/page=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }
    getTopicList(){
        console.log(localStorage.getItem("token"));
        return axios(
            {
                url:`topic/all`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }
    addTopic(newTopic){
        return axios(
            {
                url:`/topic/createTopic/${localStorage.getItem("accid")}`,
                method:"post",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: newTopic
            }
        );
    }
    deleteTopic(id){
        return axios(
            {
                url:`/topic/deleteTopic/${id}/${localStorage.getItem("accid")}`,
                method:"delete",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }
    editTopic(updatedTopic){
        return axios(
            {
                url:`/topic/editTopic/${localStorage.getItem("accid")}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: updatedTopic
            }
        );
    }
}
export default new TopicService(); 