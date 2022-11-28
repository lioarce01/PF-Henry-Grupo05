import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import ModalDonate from "./Donate/ModalDonate"
import ModalCreatePost from "../Home/Modals/ModalCreatePost"

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"
import { useLazyGetUserByIdQuery } from "../../redux/api/users"
import { setUserAction } from "../../redux/slices/manageUsers/actions"
import { useEnableShelterMutation, useGetShelterByIdQuery } from "../../redux/api/shelters"

import ProfileUpper from './ProfileUpper'
import ProfileBottom from './ProfileBottom'
import ProfileSidebar from './ProfileSidebar'


const OngDetail = () => {
    // define use of hooks
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // get user and shelter info
    const { userDetail } = useSelector(state => state.localStorage.userState)
    const { data: details, isLoading, refetch: shelterRefetch, error } = useGetShelterByIdQuery(id)

    // donate modal handler
    const [isOpenDonate, setIsOpenDonate] = useState(false)
    const closeModalDonate = () => setIsOpenDonate(false)

    // create post modal handler
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)

    // definition of lazy query and mutation
    const [getUser] = useLazyGetUserByIdQuery()
    const [enableShelter] = useEnableShelterMutation()

    // is there an error while loading shelter info, then display it
    // (it sure must be an invalid ID error, cannot be anything else)
    if (error) {
        Swal.fire({ icon: "error", title: "Invalid Shelter ID" })
        navigate("/home");
    }
    
    // enables a shelter and assigns the user
    const enable = async id => {
        await enableShelter(id).unwrap()
        const newUser = await getUser(userDetail.id).unwrap()
        dispatch(setUserAction(newUser, true))
    }

    // if modal state changes, refetch shelter query 
    useEffect(() => {
        shelterRefetch();
    }, [isOpen]);

    // depending on enabled status of shelter, display a message
    useEffect(() => {
        if (details?.enable === false) {
            Swal.fire({
                title: "Your shelter is disabled, do you want to activate it?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(result => {
                if (result.isConfirmed) {
                    enable({ shelterId: id })
                    Swal.fire("Your shelter is now enabled!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Your shelter is still disabled", "", "info");
                }
            });
        }
    }, [details]);

    
    return (
        <div className="flex flex-row w-screen h-screen bg-[#EFF0F3] dark:bg-[#27242C] overflow-y-hidden">
            <div className="h-screen xsm:w-0 sm:w-fit">
                <ProfileSidebar profilePic={details?.profilePic} city={details?.city} country={details?.country} website={details?.website}
                id={details?.id} postsLength={details?.posts?.length} followersLength={details?.followers?.length} />
            </div>

            <div className="w-full overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#E06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
                <div className="xsm:mt-[30px] md:mt-[35px] xsm:ml-[10px] sm:ml-[20px] md:ml-[40px] xl:ml-[60px] 2xl:ml-[100px] xsm:mr-0 sm:mr-[20px] md:mr-[40px] 2xl:mr-[60px]">
                    <ProfileUpper setIsOpenDonate={setIsOpenDonate} loading={isLoading} shelterRefetch={shelterRefetch} details={details} />
                    <ProfileBottom setIsOpen={setIsOpen} details={details} />
                </div>
            </div>

            <ModalDonate isOpen={isOpenDonate} closeModal={closeModalDonate} name={details?.name} id={id} />
            <ModalCreatePost isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

export default OngDetail