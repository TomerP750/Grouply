import axios from "axios";
import type { EditPostRequestDTO } from "../forms/EditPostForm";
import { BASE_API } from "../../../../shared/utils/base_api";
import type { CreateProjectPostDTO } from "../models/CreateProjectPostDTO";




class PostService {

    async allPosts(page = 0, size = 10) {

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

    }

    async allPostsWhereUserIsOwner(page: number, size: number) {
        return (await axios.get(`${BASE_API}/post/dashboard/all?page=${page}&size=${size}`)).data
    }


}

const postService = new PostService();
export default postService;