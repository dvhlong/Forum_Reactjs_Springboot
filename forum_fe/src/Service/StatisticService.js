import axios from "axios";
class StatisticService {
    baseURL = "https://dvhl-forum-be.herokuapp.com";
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