import axios from "axios";
const token=localStorage.getItem("token");
class PostService{
    createPost(topicid,newPost){
        return axios(
            {
                url:`/post/createPost/${topicid}/${localStorage.getItem("accid")}`,
                method:"post",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
                data: newPost
            }
        );
    }
    getPostsPage(page){
        return axios(
            {
                url:`post/page=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
    getApprovePost(page){
        return axios(
            {
                url:`post/approvePost/page=${page}`,
                method:"get",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
    rejectPost(id){
        return axios(
            {
                url:`/post/deletePost/${id}/${localStorage.getItem("accid")}`,
                method:"delete",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
    approvePost(id){
        return axios(
            {
                url:`/post/approve/${localStorage.getItem("accid")}/${id}`,
                method:"put",
                baseURL:"http://localhost:8080",
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
    }
}
export default new PostService();