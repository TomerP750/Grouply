

export interface ProjectReview {

    grade: number 
    summary: string
    positives: string[]
    improvments: string[]
    metrics: Record<string, number>;

}