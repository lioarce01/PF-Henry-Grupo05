import Swal from "sweetalert2"
import { useState } from "react"
import Goals from '../../Goals/Goals'
import { FaInfo } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import ModalEdit from '../ModalEdit/ModalEdit'
import { GiReceiveMoney } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserByIdQuery } from "../../../redux/api/users"
import ModalDescription from '../ModalDescription/ModalDescription'
import { RiUserFollowFill, RiUserUnfollowLine } from 'react-icons/ri'
import { useAddFollowersMutation, useDeleteFollowersMutation } from "../../../redux/api/shelters"
import { addFollowingAction, removeFollowingAction } from '../../../redux/slices/manageUsers/actions'


const ProfileUpper = ({ details, setIsOpenDonate, loading, shelterRefetch }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loginWithPopup } = useAuth0();

    // description modal handler
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)

    // edit modal handler
    const [modalEdit, setModalEdit] = useState(false);
    const closeModalEdit = () => setModalEdit(false);

    const { isAuth, userDetail } = useSelector(state => state.localStorage.userState)
    const { data: gotUser, refetch: userRefetch } = useGetUserByIdQuery(userDetail?.id)

    const [unfollow] = useDeleteFollowersMutation()
    const [follow] = useAddFollowersMutation()

    console.log("gotUser: ", details)

		const deleteFollow = async () => {
			if (isAuth) {
				await unfollow({ shelterId: details?.id, userId: gotUser.id })
				shelterRefetch()
				userRefetch()
			} else {
				dispatch(removeFollowingAction(details?.id))
				shelterRefetch()
				userRefetch()
			}
		}

		const addFollow = async () => {
			if (isAuth) {
				await follow({ shelterId: details?.id, userId: userDetail.id })
				shelterRefetch()
				userRefetch()
			} else {
				if (userDetail.following.length > 2) {
					Swal.fire({
						icon: "error",
						title: "Create a user or log in to save your following",
						preConfirm: async () => {
							navigate(`/home`)
							await loginWithPopup()
						},
					})
				} else {
					dispatch(addFollowingAction(details))
					shelterRefetch()
					userRefetch()
				}
			}
		}

		return (
			<div className="w-full">
				<div className="flex xsm:flex-col sm:flex-row">
					<h1 className="text-[#FF7272] xsm:text-3xl xxl:text-4xl font-bold xsm:text-center lg:max-w-[400px] xl:max-w-fit">
						{details?.name}
					</h1>

					<div className="xsm:mt-[20px] sm:mt-0 xsm:mx-auto sm:ml-auto sm:mr-0 flex flex-row">
						{gotUser?.Shelter[0]?.id === details?.id ? (
							<button
								onClick={() => setModalEdit(true)}
								className="bg-[#6371f1] hover:bg-[#5460d1] dark:bg-[#7F8AF3] dark:hover:bg-[#6a75d3]
                                rounded-full p-[15px] font-semibold transition-all duration-200 mr-[15px]"
							>
								<AiFillEdit className="text-white text-xl" />
							</button>
						) : (
							undefined
						)}

						{gotUser?.Shelter[0]?.id !== details?.id ? (
							<button
								onClick={() => setIsOpenDonate(true)}
								className="bg-white md:h-fit hover:bg-[#c9c8c8] dark:bg-[#1B1A1F] shadow-[0px_0px_25px_-8px_rgba(0,0,0,0.2)]
                        dark:hover:bg-[#35333b] rounded-full p-[15px] font-semibold transition-all duration-200 mr-[15px] group dark:shadow-[0px_0px_25px_-8px_rgba(255,255,255,0.1)]"
							>
								<GiReceiveMoney className="text-[#6371f1] group-hover:text-[#5563ff] dark:text-white dark:group-hover:text-white text-xl" />
							</button>
						) : (
							undefined
						)}

						{gotUser?.id !== details?.authorId ? (
							<div>
								{gotUser?.following?.find(
									(shelter) => shelter.id === details?.id
								) ||
								userDetail?.following?.find(
									(shelter) => shelter.id === details?.id
								) ? (
									<button
										onClick={deleteFollow}
										className="bg-[#FF7272] hover:bg-[#e76464] dark:bg-[#E06161] dark:hover:bg-[#cf5757]
                            rounded-full p-[15px] font-semibold transition-all duration-200 mr-[15px]"
									>
										<RiUserUnfollowLine className="text-white text-xl" />
									</button>
								) : (
									<button
										onClick={addFollow}
										className="bg-[#6371f1] hover:bg-[#5460d1] dark:bg-[#7F8AF3] dark:hover:bg-[#6a75d3]
                            rounded-full p-[15px] font-semibold transition-all duration-200 mr-[15px]"
									>
										<RiUserFollowFill className="text-white text-xl" />
									</button>
								)}
							</div>
						) : (
							undefined
						)}

						<button
							onClick={() => setIsOpen(true)}
							className="flex flex-row md:h-fit items-center bg-[#FF7272] hover:bg-[#e76464] transition-all
                    dark:bg-[#E06161] dark:hover:bg-[#cf5757] rounded-full pl-[5px] xl:pr-[25px] xsm:pr-[5px] py-[5px] group duration-300"
						>
							<div className="xl:bg-[#c25050] xl:group-hover:bg-[#bb4b4b] p-[10px] rounded-full">
								<FaInfo className="text-xl text-white" />
							</div>

							<span className="text-lg ml-[10px] font-semibold text-white xsm:hidden xl:flex">
								Details
							</span>
						</button>
					</div>
				</div>

				<div className="xsm:mt-[15px] sm:mt-[30px] w-full">
					<Goals
						goals={details?.goals}
						shelterId={details?.id}
						loading={loading}
						shelterName={details?.name}
						shelterRefetch={shelterRefetch}
						setIsOpenDonate={setIsOpenDonate}
						authorId={details?.authorId}
					/>
				</div>

				<ModalEdit
					isOpen={modalEdit}
					closeModal={closeModalEdit}
					details={details}
					shelterRefetch={shelterRefetch}
				/>
				<ModalDescription
					isOpen={isOpen}
					closeModal={closeModal}
					details={details}
					shelterRefetch={shelterRefetch}
				/>
			</div>
		)
}

export default ProfileUpper