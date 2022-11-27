import Goals from '../Goals/Goals'
import { FaInfo } from 'react-icons/fa'
import { RiUserFollowFill } from 'react-icons/ri'

const ProfileUpper = ({ id, name, goals, setIsOpenDonate, loading, shelterRefetch }) => {
    
    return (
        <div className='w-full'>
            <div className="flex flex-row">
                <h1 className="text-[#FF7272] text-4xl font-bold">{name}</h1>

                <div className='ml-auto flex flex-row'>
                    <button className="bg-[#6371f1] hover:bg-[#5460d1] dark:bg-[#7F8AF3] dark:hover:bg-[#6a75d3]
                     rounded-full p-[15px] font-semibold  text-white transition-all duration-200 mr-[15px]">
                        <RiUserFollowFill className='text-white text-xl' />
                    </button>

                    <button className='flex flex-row items-center bg-[#FF7272] hover:bg-[#e76464] transition-all
                    dark:bg-[#E06161] dark:hover:bg-[#cf5757] rounded-full pl-[5px] pr-[25px] group duration-300'>
                        <div className='bg-[#c25050] group-hover:bg-[#bb4b4b] p-[10px] rounded-full'>
                            <FaInfo className='text-xl text-white'/>
                        </div>
                        
                        <span className='text-lg ml-[10px] font-semibold text-white'>Details</span>
                    </button>
                </div>
            </div>

            <div className="mt-[20px] w-full">
                <Goals
					goals={goals}
                    shelterId={id}
                    loading={loading}
                    shelterName={name}
                    shelterRefetch={shelterRefetch}
					setIsOpenDonate={setIsOpenDonate}
				/>
            </div>
        </div>
    )
}

export default ProfileUpper