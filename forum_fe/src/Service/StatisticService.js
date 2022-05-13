import axios from "axios";
class StatisticService{
    
    getStatistic(ourRequest){
        return axios(
            {
                url:`/statistic/get`,
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
export default new StatisticService();