import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateShelterMutation } from "../../redux/api/shelters";
import { useGetShelterByIdQuery } from "../../redux/api/shelters"
import OngFormUpdate from "./OngFormUpdate";
import CardPost from "../Home/CardPost";
import PostFilters from "../Home/PostFilters";
import NavBar from '../Navbar/Navbar'
import CreatePostModal from "../Home/ModalCreatePost";
import Spinner from "../Spinner/Spinner"

const OngDetail = () => {
    const { id } = useParams();
    
    const { data: details, isLoading, error, isSuccess, isFetching, refetch } = useGetShelterByIdQuery(id)

    const [updateShelter, { data: updated, updaterLoading, updaterError }] = useUpdateShelterMutation()

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    const [input, setInput] = useState({
        description: details?.description
    })

    const [toggle, setToggle] = useState(true)
    const [toggle2, setToggle2] = useState(true)
    
    const inputHandler = (e) => {
        e.preventDefault();
        setInput({ description: e.target.value });
    }

    const editHandler = () => setToggle(! toggle)
    const editHandler2 = () => setToggle2(! toggle2)
    const saveHandler = () => updateShelter({updatedShelter: {...details, description: input.description}, id})

    return (
        <div>
        {! isLoading ? (
            <div className='w-full min-h-screen h-fit bg-[#FAF2E7]'>
            <NavBar />
            <div className='flex flex-row justify-end w-full h-full pt-20 '>
                {details?.description?.length > 0 && <div className="fixed left-10 flex flex-col items-center ml-5 border w-fit h-fit p-2 border-4 border-[#462312] rounded-lg ">
                    <div className="border w-80 h-fit border-red-50">
                        <OngFormUpdate toggle={toggle} name={details?.name} country={details?.country} 
                        city={details?.city} address={details?.address} website={details?.website} description={details?.description} />
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
                                type="text" name="description" onChange={inputHandler} defaultValue={details?.description}
                                disabled={toggle2} value={input.description} rows='1' cols='1' />
                            <div className="flex flex-row-reverse justify-between w-full">
                                <div>
                                    <button className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                                        onClick={editHandler2}>Edit</button>
                                </div>
                                <div>
                                    {!toggle2 && <button className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                                        onClick={saveHandler}>Save</button>}
                                </div>
                            </div>
                        </div>

                        {/* componente post */}
                        <div className={`${details?.posts && details?.posts.length ? "w-full" : "w-[360px]"} min-h-[50rem] py-10 mb-4 mt-14`}>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto flex"
                            >
                                Create Post
                            </button>

                            {(details?.posts && details?.posts.length) ? (
                                <div className='flex items-center justify-end'>
                                    <PostFilters />
                                </div>
                            ) : null}

                            <div className=''>
                                {details?.posts.length ? details?.posts.map(post => {
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
                                }) : <h2 className="mt-[40px] text-center">No posts available.</h2>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreatePostModal isOpen={isOpen} closeModal={closeModal} />

        </div>
        ) : (<Spinner />)}
        </div>
    )


}

export default OngDetail