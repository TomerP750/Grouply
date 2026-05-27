import axios from "axios";
import type { CreateProjectPostDTO } from "../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import { BASE_API } from "../util/base_api";

import type { EditPostRequestDTO } from "../components/features/posts-area/forms/edit_post_form";
import type { ProjectPosition } from "../dtos/enums/ProjectPosition";


class PostService {

    async allPosts(page = 0, size = 10, roles?: ProjectPosition[]) {

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
        });

        if (roles?.length) roles.forEach(r => params.append("roles", r));

        return (await axios.get(`${BASE_API}/post/all${params.toString()}`)).data
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