import axios from "axios";

class NotificationService {
    baseURL = "http://" + window.location.hostname + ":8080";
    getNotifications(page, ourRequest) {
        return axios(
            {
                url: `/notification/${localStorage.getItem("accid")}/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token,
            }
        );
    }
}

export default new NotificationService();