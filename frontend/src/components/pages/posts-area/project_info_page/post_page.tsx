import { useEffect } from "react";
import { useParams } from "react-router-dom"
import projectPostService from "../../../../service/ProjectPostService";


export function PostPage() {

    const params = useParams();
    const id = +params.id!;

    useEffect(() => {
        
    }, []);

    return (
        <main className="min-h-screen dark:bg-slate-900">
            
        </main>
    )
}