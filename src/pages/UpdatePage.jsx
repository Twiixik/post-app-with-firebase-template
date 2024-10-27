import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePage() {
    
    const [caption, setCaption] = useState("");
    const [image, setImage ] = useState("");
    const params = useParams();
    const url = `https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.id}.json`;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const postData = await response.json();
            console.log(postData);
            setCaption(postData.caption);
            setImage(postData.image);
        }
        getPost();   
    }, [url]);

    async function handleSubmit(event){
        event.preventDefault();
    }

    return (
        <section className="page" id="update-page">
            <div className="container">
                <h1>Update Post</h1>
                <form className="form-grid" onSubmit={handleSubmit}>
                    <label htmlFor="caption">Caption</label>
                    <input  id="caption"
                            name="caption" 
                            type="text" 
                            value={caption}
                            aria-label="caption"
                            placeholder="Write a caption..."
                            onChange={e => setCaption(e.target.value)}
                    />
                    <label htmlFor="image-url">Image</label>
                    <input  id="image-url"
                            name="image-url" 
                            type="url" 
                            value={image}
                            aria-label="image"
                            placeholder="Paste an image url..."
                            onChange={e => setImage(e.target.value)}
                    />
                    <label htmlFor="image-preview"></label>
          <img
            id="image-preview"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={e =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button>Save</button>
          </div>
        </form>
       </div>
    </section>
    );
}