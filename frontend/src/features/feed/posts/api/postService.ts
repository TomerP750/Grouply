import axios from "axios";
import type { EditPostRequestDTO } from "../forms/EditPostForm";
import type { CreateProjectPostDTO } from "../models/CreateProjectPostDTO";
import { BASE_API } from "../../../../shared/api/baseApi";


class PostService {

    async allPosts(page = 0, size = 10) {
        const res = (await axios.get(`${BASE_API}/post/all`, {
            params: { page, size }
        }))
        return res.data;
    }

    async onePost(postId: number) {
        return (await axios.get(`${BASE_API}/post/${postId}`)).data
    }

    async createPost(data: CreateProjectPostDTO) {
        return (await axios.post(`${BASE_API}/post/create`, data)).data
    }

    async deletePost(id: number) {
        return (await axios.delete(`${BASE_API}/post/delete/${id}`))
    }

    async editPost(data: EditPostRequestDTO) {
        return (await axios.put(`${BASE_API}/post/update`, data));
    }

    async allPostsWhereUserIsOwner(page: number, size: number) {
        return (await axios.get(`${BASE_API}/post/dashboard/all?page=${page}&size=${size}`)).data
    }


}

const postService = new PostService();
export default postService;