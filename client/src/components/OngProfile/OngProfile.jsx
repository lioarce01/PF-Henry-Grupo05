import React from "react";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSheltersByIdAction, updateSheltersAction,  cleanSheltersDetailsAction} from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions"; 
import OngFormUpdate from "./OngFormUpdate";
import CardPost from "../Home/CardPost";
import PostFilters from "../Home/PostFilters";
import NavBar from '../Navbar/Navbar'
import CreatePostModal from "../Home/ModalCreatePost";



//antes del lio que voy a hacer
const OngDetail  = ()=>{

const dispatch = useDispatch();
const {id} = useParams();
const details = useSelector(state => state.manageShelters.details);
let [isOpen, setIsOpen] = useState(false);
const closeModal = () => setIsOpen(false);

useEffect (()=>{
dispatch(getSheltersByIdAction(id))
return(()=>{
   dispatch(cleanSheltersDetailsAction())
})
},[dispatch])


console.log('details: ', details)


const [input, setInput] = useState({
    description: details.description
})

const [toogle, setToogle] = useState(true)
const [toogle2, setToogle2] = useState(true)
const inputHandler = (e)=>{
    e.preventDefault();
    setInput({description: e.target.value});
}
const editHandler = ()=>{
    setToogle(!toogle);
}
const editHandler2 = ()=>{
    setToogle2(!toogle2);
    //si toogle es true deberia hacer un dispatch de los cambios (useEffect on update)
}
const saveHandler = ()=>{
    dispatch(updateSheltersAction(input,id))
}

return (
    <div className='w-full min-h-screen h-fit bg-[#FAF2E7]'>
        <NavBar/>   
    <div className='flex flex-row justify-end w-full h-full pt-20 '>
        {details.description?.length >0 && <div className="fixed left-10 flex flex-col items-center ml-5 border w-fit h-fit p-2 border-4 border-[#462312] rounded-lg ">
            <div className="border w-80 h-fit border-red-50">
                    <OngFormUpdate toogle={toogle}/>
                    <button className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                    onClick={editHandler}>Edit</button>
            </div>
            <button className="bg-transparent mt-4 hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
            >Suscribe</button>
        </div>}
        <div>
        <div className="flex flex-col items-center mr-16">
            <div className="w-full border-4 border-[#462312] rounded-lg p-4">
            <textarea className="w-full resize-none h-60 text-[#462312] font-semibold text-lg"
            type="text" name="description" onChange={inputHandler} defaultValue={details.description}
            disabled={toogle2} value={input.description} rows='1' cols='1'/>
            <div className="flex flex-row-reverse justify-between w-full">
                <div>
                <button className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                onClick={editHandler2}>Edit</button>
                </div>
                <div>
                {!toogle2 && <button className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                onClick={saveHandler}>Save</button>}
                </div>
            </div>
            </div>

    {/* componente post */}
        <div className='w-full min-h-[50rem] px-32 py-10 mb-4 mt-14'>
        <button
             onClick={() => setIsOpen(true)}
            className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
            >
             Create Post
            </button>
      <div className='flex items-center justify-end'>
        <PostFilters/>
      </div>
      <div className=''>
        {
          details.posts?.map(post => {
            return (
              <CardPost
              key={post.id}
              id={post.id}
              profilePic={post.author.profilePic}
              postImage={post.image}
              author={post.author.name}
              content={post.content}
              likes={post.likes}
              createdAt={post.createdAt}
              comments={post.Comment.length}
              authorId={post.authorId}
              />
            )
          })
        }
      </div>
    </div>
        </div>
        </div>
    </div>
    <CreatePostModal isOpen={isOpen} closeModal={closeModal} />
    </div>
)


}

export default OngDetail