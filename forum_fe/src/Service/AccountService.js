import axios from "axios";
class AccountService{
    checklogin(account){
        return axios.post("http://localhost:8080/login",account);
    }
    createAccount(account){
        return axios.post("http://localhost:8080/register",account);
    }
}
export default new AccountService();