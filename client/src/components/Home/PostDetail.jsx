import { useDispatch, useSelector } from 'react-redux'
import { getPostsByIdAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'

const PostDetail = ({ id, setViewPost }) => {
    const handleClose = () => setViewPost(false)

    return (
        <div className="bg-black bg-opacity-60 z-50 absolute top-0 left-0 w-full h-full">
            <div className="bg-white w-3/5 block mx-auto mt-[110px]">
                <button onClick={handleClose}>x</button>
                <div>
                    <h1>Hola</h1>
                </div>
            </div>
        </div>
    )
}

export default PostDetail