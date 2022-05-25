import axios from "axios";
class TopicService {
    baseURL = "http://" + window.location.hostname + ":8080";
    getAllTopic(page, ourRequest) {
        return axios(
            {
                url: `topic/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    getTopicList() {
        return axios(
            {
                url: `topic/all`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    addTopic(newTopic) {
        return axios(
            {
                url: `/topic/createTopic/${localStorage.getItem("accid")}`,
                method: "post",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: newTopic
            }
        );
    }

    deleteTopic(id) {
        return axios(
            {
                url: `/topic/deleteTopic/${id}/${localStorage.getItem("accid")}`,
                method: "delete",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }

    editTopic(updatedTopic) {
        return axios(
            {
                url: `/topic/editTopic/${localStorage.getItem("accid")}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: updatedTopic
            }
        );
    }
}
export default new TopicService(); 