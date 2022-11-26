import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetTicketsByShelterQuery } from '../../redux/api/tickets'
import { selectUser } from '../../redux/slices/manageUsers'
import HomeNav from '../Home/Main/HomeNav'
import HomeSideBar from '../Home/Main/HomeSideBar'
import TicketList from '../TicketList'

function TicketsPage() {
    const {userDetail} = useSelector(selectUser)
    const {data: tickets} = useGetTicketsByShelterQuery(userDetail.Shelter[0].id)
  return (
    <>
    <Toaster />
    <div className="h-screen bg-[#EFF0F3] min-h-screen">
			<div className="flex sm:flex-row xsm:flex-col justify-between">
				<div className='sm:inline'>
					<HomeSideBar />
                    
				</div>
				<div className='flex flex-col grow h-screen min-w-0 md:pb-[40px] overflow-x-hidden overflow-y-scroll scrollbar-thin 
				scrollbar-thumb-[#FF7272] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md'>
                    <div className="sm:ml-[15px] md:ml-[30px] lg:ml-[50px] xl:ml-[100px]">
						<HomeNav />
					</div>
						<div className='lg:contents'>
							{tickets?.payload && <TicketList tickets={tickets}/>}
						</div>
			
				</div>
				<div>
					
				</div>
			</div>
		</div>
    </>
  )
}

export default TicketsPage