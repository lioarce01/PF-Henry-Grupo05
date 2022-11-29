import TopShelters from './TopShelters'
import Posts from '../Posts'
import HomeNav from './HomeNav'
import HomeSideBar from './HomeSideBar'
import HomeCarousel from './HomeCarousel/HomeCarousel'
import HomeChatBot from '../HomeChatBot'
import { Toaster } from 'react-hot-toast'

const Home = () => {
	return (
		<div className="h-screen bg-[#EFF0F3] dark:bg-[#27242C] min-h-screen">
			<Toaster />
			<div className="flex sm:flex-row xsm:flex-col justify-between">
				<div className='sm:inline'>
					<HomeSideBar />
				</div>
				<div className='flex flex-col grow h-screen min-w-0 md:pb-[40px] overflow-x-hidden overflow-y-scroll scrollbar-thin 
				scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#e06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md'>
					<div className="sm:ml-[15px] md:ml-[30px] lg:ml-[50px] xl:ml-[100px]">
						<HomeNav />
					</div>

					<div className='sm:ml-[35px] md:ml-[50px] lg:ml-[70px] xl:ml-[120px] mt-[20px]'>
						<HomeCarousel />
					</div>

					<div className="flex flex-row mt-[-5px] sm:ml-[15px] md:ml-[30px] lg:ml-[50px] xl:ml-[100px]"> 
						<div className='xsm:hidden lg:contents'>
							<Posts />
						</div>
						<div className='xsm:pb-[40px] lg:hidden xl:contents w-full'>
							<TopShelters />

							<div className='fixed right-[20px] bottom-[20px] z-50'>
								<HomeChatBot />
							</div>
						</div>
					</div>
				</div>
				<div>
					
				</div>
			</div>
		</div>
	)
}

export default Home
