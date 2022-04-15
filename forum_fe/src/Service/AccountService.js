import axios from "axios";
const token=localStorage.getItem("token");
class AccountService{
    checklogin(account){
        return axios.post("http://localhost:8080/login",account);
    }
    createAccount(account){
        return axios.post("http://localhost:8080/register",account);
    }
    getAccInfo(){
        return axios(
            {
                url:`/getUserInfo/${localStorage.getItem("accid")}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
    changeAccInfo(updatedInfo){
        return axios(
            {
                url:`/changeAccInfo/${localStorage.getItem("accid")}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                data:updatedInfo
            }
        );
    }
    changePass(pass){
        return axios(
            {
                url:`/changeAccPass/${localStorage.getItem("accid")}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                data:pass
            }
        );
    }
}
export default new AccountService();