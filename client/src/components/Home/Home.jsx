import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'
import { Toaster } from 'react-hot-toast'
import HomeChatBot from "./HomeChatBot"

const Home = () => {
	return (
		<div className="w-full h-screen bg-[#fff5f4] min-h-screen overflow-y-hidden">
			<Toaster />
			<Navbar />
			<div className="flex flex-row justify-between pt-14">
				<div>
					<SubscriptorsBar />
				</div>
				<div>
					<Posts />
				</div>
				<div>
					<Ongs />
				</div>
				<div className="absolute bottom-1 right-4">
					<HomeChatBot />
				</div>
			</div>
		</div>
	)
}

export default Home
