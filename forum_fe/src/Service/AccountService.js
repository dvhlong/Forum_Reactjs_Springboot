import axios from "axios";
class AccountService{
    
    checkToken(){
        return axios(
            {
                url:`/checkToken`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }

    block(id){
        return axios(
            {
                url:`/blockAcc/${id}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    chagneRole(id,role){
        return axios(
            {
                url:`/changeAccRole/${id}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data:role
            }
        );
    }

    getAllAcc(page,ourRequest){
        return axios(
            {
                url:`/getAllAcc/pages=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken:ourRequest.token
            }
        );
    }

    checklogin(account){
        return axios.post("http://localhost:8080/login",account);
    }

    createAccount(account){
        return axios.post("http://localhost:8080/register",account);
    }

    getAccInfo(ourRequest){
        return axios(
            {
                url:`/getUserInfo/${localStorage.getItem("accid")}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken:ourRequest.token
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
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data:pass
            }
        );
    }
    
    uploadAvatar(formData){
        return axios(
            {
                url:`/uploadAvatar/${localStorage.getItem("accid")}`,
                method:"post",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
                data:formData
            }
        );
    }
}
export default new AccountService();