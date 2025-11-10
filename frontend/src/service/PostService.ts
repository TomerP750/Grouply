import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { CreateProjectPostDTO } from "../dtos/models_dtos/request_dto/CreateProjectPostDTO";

import type { ProjectPosition } from "../dtos/enums/ProjectPosition";
import type { TechnologyDTO } from "../dtos/models_dtos/TechnologyDTO";
import type { EditPostRequestDTO } from "../components/pages/posts-area/forms/edit_post_form";


class PostService {

    async allPosts(page = 0, size = 10, roles?: ProjectPosition[]) {
        const params = new URLSearchParams({
            page: String(page),
            size: String(size)
        });

        if (roles?.length) {
            roles.forEach(r => params.append("roles", r));
        }

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

    async searchPosts(roles: ProjectPosition[], techs: TechnologyDTO[]) {
        const params = new URLSearchParams();
        roles.forEach(r => params.append("roles", r));
        techs.forEach(t => params.append("techIds", String(t.id)));
        return (await axios.get(`${BASE_API}/post/search?${params.toString()}`)).data
    } 




}

const postService = new PostService();
export default postService;