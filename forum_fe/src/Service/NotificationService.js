import axios from "axios";

class NotificationService {
    getNotifications(page,ourRequest){
        return axios(
            {
                url:`/notification/${localStorage.getItem("accid")}/page=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken:ourRequest.token,
            }
        );
    }
}

export default new NotificationService();