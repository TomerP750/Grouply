

export class CreateProjectPostDTO {

    title: string
    description: string
    projectId: number

    constructor(title: string, description: string, projectId: number) {
        this.title = title
        this.description = description
        this.projectId = projectId
    }
 
}