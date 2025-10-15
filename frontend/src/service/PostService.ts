import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { CreateProjectPostDTO } from "../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import type { EditPostRequestDTO } from "../components/pages/posts-area/edit_post_form";


class PostService {

    async allPosts(page = 0, size = 10) {
        return (await axios.get(`${BASE_API}/post/all?page=${page}&size=${size}`)).data
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

}

const postService = new PostService();
export default postService;