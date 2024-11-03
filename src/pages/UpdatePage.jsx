import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const url = `https://timotejsproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.id}.json`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      console.log(postData);
      setCaption(postData.caption);
      setImage(postData.image);
      setBody(postData.body);
    }
    getPost();
  }, [url]);

  async function handleSubmit(event) {
    event.preventDefault();

    const postToUpdate = { caption, image, body };

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(postToUpdate),
    });

    if (response.ok) {
      navigate(`/posts/${params.id}`);
    } else {
      console.error("Update failed");
    }
  }

  return (
    <section className="page" id="update-page">
      <div className="container">
        <h1>Update Post</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            name="caption"
            type="text"
            value={caption}
            aria-label="caption"
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
          <label htmlFor="image-url">Image</label>
          <input
            id="image-url"
            name="image-url"
            type="url"
            value={image}
            aria-label="image"
            placeholder="Paste an image url..."
            onChange={(e) => setImage(e.target.value)}
          />
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={body}
            aria-label="body"
            placeholder="Write your post body..."
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
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
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
