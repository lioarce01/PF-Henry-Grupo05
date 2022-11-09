import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";

const PostForm = () => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        image: "",
        content: "",
        // traer el id del usuario. por ahora hardcodeado :p
        authorId: "636a8f4282add8c3a4ec853e"
    });

    const inputHandler = e => {
        e.preventDefault();
        setInput({...input, [e.target.name]: e.target.value});
    }

    const submitPost = e => {
        e.preventDefault();

        const newPost = {
            image: input.image,
            content: input.content
        }

        dispatch(createPostAction(newPost))
        .then(res => alert(res.payload))
    }

    return (
        <div>
            <form>
                <textarea className="block resize-none border border-black rounded" name="content" placeholder="Share something meaningful..." rows="4" cols="50" onChange={inputHandler} value={input.content} />
                <input className="block border border-black mt-5" type="text" name="image" onChange={inputHandler} value={input.image} placeholder="Wanna post an image?" />
                <button className="block border border-black mt-5 px-3" onClick={submitPost}>Post</button>
            </form>
        </div>
    )
}

export default PostForm;