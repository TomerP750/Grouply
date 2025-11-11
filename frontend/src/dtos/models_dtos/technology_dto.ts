


export class TechnologyDTO {

    id: number
    name: string
    slug: string
    icon: string
    color: string

    constructor(id: number, name: string, slug: string, icon: string, color: string) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.icon = icon;
        this.color = color;
    }
    
}