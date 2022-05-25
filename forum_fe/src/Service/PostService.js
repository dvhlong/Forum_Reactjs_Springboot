import axios from "axios";
class PostService {
    baseURL = "http://" + window.location.hostname + ":8080";
    createPost(topicid, newPost) {
        return axios(
            {
                url: `/post/createPost/${topicid}/${localStorage.getItem("accid")}`,
                method: "post",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: newPost
            }
        );
    }

    getPost(id, ourRequest) {
        return axios(
            {
                url: `post/${id}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    getComments(id, page) {
        return axios(
            {
                url: `post/${id}/comments/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    addComment(postid, replyid, comment) {
        return axios(
            {
                url: `post/${postid}/${localStorage.getItem("accid")}/${replyid}/addComment`,
                method: "post",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: comment
            }
        );
    }

    editComment(commentid, comment) {
        return axios(
            {
                url: `post/${commentid}/${localStorage.getItem("accid")}/editComment`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: comment
            }
        );
    }

    deleteComment(commentid) {
        return axios(
            {
                url: `post/${commentid}/${localStorage.getItem("accid")}/deleteComment`,
                method: "delete",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    getPosts(page, ourRequest) {
        return axios(
            {
                url: `post/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    getPostsByKeyword(key, page, ourRequest) {
        return axios(
            {
                url: `post/key=${key}/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    getPostsByTopic(topicid, page, ourRequest) {
        return axios(
            {
                url: `post/topic/${topicid}/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    getPostsNotApprove(page, ourRequest) {
        return axios(
            {
                url: `post/approvePost/page=${page}`,
                method: "get",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                cancelToken: ourRequest.token
            }
        );
    }

    rejectPost(id) {
        return axios(
            {
                url: `/post/deletePost/${id}/${localStorage.getItem("accid")}`,
                method: "delete",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }

    approvePost(id) {
        return axios(
            {
                url: `/post/approve/${localStorage.getItem("accid")}/${id}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }

    editPost(topicid, updatedPost) {
        return axios(
            {
                url: `/post/editPost/${topicid}/${localStorage.getItem("accid")}`,
                method: "put",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: updatedPost
            }
        );
    }

    deletePost(id) {
        return axios(
            {
                url: `/post/deletePost/${id}/${localStorage.getItem("accid")}`,
                method: "delete",
                baseURL: this.baseURL,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    }
}
export default new PostService();