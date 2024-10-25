import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./../components/PostCard";


export default function PostDetailPage() {
    const [post, setPost] = useState({});
    const params = useParams();
    const url = `https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.id}.json`;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const postData = await response.json();
            console.log(postData);
            setPost(postData);
        }
        getPost();   
    }, [url])

    return (
        <section className="page" id="post=page">
            <div className="container">
                <h1>{post.caption}</h1>
                <PostCard post={post} />
            </div>
        </section>
    )
}