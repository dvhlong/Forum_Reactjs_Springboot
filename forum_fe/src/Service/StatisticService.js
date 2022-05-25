import axios from "axios";
class StatisticService {
    baseURL = "http://" + window.location.hostname + ":8080";
    getStatistic(ourRequest) {
        return axios(
            {
                url: `/statistic/get`,
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
export default new StatisticService();