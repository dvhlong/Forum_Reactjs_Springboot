import axios from "axios";
class AccountService {
    // baseURL = "http://" + window.location.hostname + ":8080";
    baseURL = "https://dvhl-forum-be.herokuapp.com";
    checkToken() {
        return axios(
            {
                url: `/checkToken`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }

    block(id) {
        return axios(
            {
                url: `/blockAcc/${id}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    chagneRole(id, role) {
        return axios(
            {
                url: `/changeAccRole/${id}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: role
            }
        );
    }

    getAllAcc(page, ourRequest) {
        return axios(
            {
                url: `/getAllAcc/pages=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    checklogin(account) {
        return axios.post(this.baseURL + "/login", account);
    }

    createAccount(account) {
        return axios.post(this.baseURL + "/register", account);
    }

    getAccInfo(ourRequest) {
        return axios(
            {
                url: `/getUserInfo/${localStorage.getItem("accid")}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    changeAccInfo(updatedInfo) {
        return axios(
            {
                url: `/changeAccInfo/${localStorage.getItem("accid")}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: updatedInfo
            }
        );
    }

    changePass(pass) {
        return axios(
            {
                url: `/changeAccPass/${localStorage.getItem("accid")}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: pass
            }
        );
    }

    uploadAvatar(formData) {
        return axios(
            {
                url: `/uploadAvatar/${localStorage.getItem("accid")}`,
                method: "post",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
                data: formData
            }
        );
    }
}
export default new AccountService();