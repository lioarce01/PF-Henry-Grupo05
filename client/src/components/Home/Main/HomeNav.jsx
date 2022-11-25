import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'
import { useGetSheltersQuery } from "../../../redux/api/shelters"
import { useSelector } from "react-redux"
import ModalShelters from '../Modals/ModalShelters'
import ModalCreatePost from "../Modals/ModalCreatePost"

// animals array to map filters. used to optimize code
const animals = [{ type: 'Dogs', emoji: '🐶', target: 'activeDogs' }, { type: 'Cats', emoji: '😺', target: 'activeCats' },
{ type: 'Farm Animals', emoji: '🐷', target: 'activeFarm' }, { type: 'Wild Animals', emoji: '🐻', target: 'activeWild' },
{ type: 'Domestic Animals', emoji: '🐹', target: 'activeDomestic' }]

// array of phrases to load randomly at the start of the page
const welcomePhrases = ['Start to cooperate!', 'Be a hero!', 'Save an animal, today!', 
'They need your kindness!', 'Take a peak...', 'Do you love animals?']

const rndIndex = Math.floor(Math.random() * (welcomePhrases.length))


const HomeNav = () => {
    // is user verified? :p
    const { isAuth } = useSelector(state => state.localStorage.userState)

    // fetch all enabled shelters
    const { data: shelters, refetch } = useGetSheltersQuery({ name: "", enabled: true })

    // handles animal filter buttons
    const [active, setActive] = useState({
        activeDogs: false, activeFarm: false,
        activeCats: false, activeWild: false,
        activeDomestic: false,
    })

    const handleActive = e => {
        const tag = e.target.localName === 'span' ? e.target.parentElement.name : e.target.name

        setActive({
            ...active,
            [tag]: ! active[tag]
        })
    }

    // handles detailed shelter modal view
    const [open, setOpen] = useState(false)
    const displayShelters = () => setOpen(true)

    // handles post creator modal window
    const [openCreatePost, setOpenCreatePost] = useState(false)
    const closeModal = () => setOpenCreatePost(false)

    // handles search bar, opening results on modal
    const [search, setSearch] = useState({
        submit: false,
        query: ''
    })

    const handleChange = e => setSearch({ ...search, query: e.target.value })

    const handleSearch = e => {
        e.preventDefault()
        setSearch({ ...search, submit: true })
        displayShelters()
    }

    // ------------------------------------------ //

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className="grow w-full">
            <div className='flex flex-row'>
                <div className="sm:w-[250px] md:w-[270px] lg:w-[350px] h-[50px] bg-white dark:bg-[#1b1a1f] ml-[20px] mt-[30px] rounded-full">
                    <form onSubmit={e => handleSearch(e)} className='flex flex-row w-full items-center h-full'>
                        <input type="text" className="bg-white dark:bg-[#1b1a1f] h-full pl-[20px] lg:pr-[80px] rounded-full focus:outline-none"
                            placeholder="Type to search shelters..." onChange={e => handleChange(e)} />
                        <button className='ml-auto mr-[10px] p-[10px] bg-[#FF7272] dark:bg-[#e06161] rounded-full hover:bg-[#e76464] dark:hover:bg-[#be4f4f]'>
                            <BsSearch className='text-white' />
                        </button>
                    </form>
                </div>

                {isAuth && <button onClick={() => setOpenCreatePost(true)} className='flex flex-row bg-[#FF7272] dark:bg-[#e06161] ml-auto md:mr-[30px] lg:mr-[30px] xl:mr-[60px]
                xsm:mr-[20px] sm:mt-[30px] sm:h-fit pl-[5px] xsm:pr-[2px] xsm:pl-[2px] xsm:h-[44px] xsm:mt-[33px] md:pr-[20px] rounded-full items-center hover:bg-[#e76464] dark:hover:bg-[#be4f4f] transition-colors duration-300'>
                    <span className="p-[7px] rounded-full">
                        <HiPencil className='text-2xl text-white' />
                    </span>
                    <span className='font-semibold text-white ml-[5px] xsm:hidden md:contents'>Create Post</span>
                </button>}
            </div>

            <h1 className='font-semibold ml-[20px] mt-[30px] text-[1.3rem] text-[#FF7272] hover:underline w-fit'>{welcomePhrases[rndIndex]}</h1>

            <div className='flex sm:flex-row xsm:flex-col mt-[15px]'>
                <div className="flex flex-row ml-[20px] first:ml-[5px]">
                    {animals.map(anm => {
                        return (
                            <button name={anm.target} onClick={e => handleActive(e)} className={`flex flex-row pl-[5px] lg:py-[5px] lg:pr-[20px] xl:pr-[25px] ml-[10px] transition-all duration-200 xsm:h-[50px] xsm:pr-[5px] 
                                ${! active[anm.target] ? "bg-white hover:bg-[#d6d6d6] dark:bg-[#1b1a1f] dark:hover:bg-[#111114]" : "bg-[#FF7272] dark:bg-[#e06161] hover:bg-[#e76464]"} rounded-full items-center group`}>
                                <span className={`${! active[anm.target] ? "bg-[#EFF0F3] group-hover:bg-[#e1e2e6] dark:bg-[#27242C] dark:group-hover:bg-[#1b1a1f]" : "bg-[#d35959] group-hover:bg-[#bb4d4d] dark:bg-[#b94f4f]"} p-[7px] rounded-full`}>{anm.emoji}</span>
                                <span className={`lg:text-[0.8rem] xl:text-[1rem] lg:ml-[7px] xl:ml-[15px] font-semibold group-hover:text-white xsm:hidden lg:inline ${! active[anm.target] ? "text-[#979b9c] dark:text-[#abb0b1]" : "text-white"}`}>{anm.type}</span>
                            </button>
                        )
                    })}
                </div>

                <button onClick={displayShelters} className='flex flex-row sm:ml-auto xsm:ml-[20px] mt-[20px] hover:underline underline-offset-4 decoration-[#979b9c] sm:mr-[20px] md:mr-[30px] xl:mr-[60px]'>
                    <h2 className="text-[#979b9c] dark:text-[#afb3b4] lg:text-[0.9rem] xl:text-[1rem]">Browse Shelters
                        <strong className="font-semibold text-[#FF7272]"> ({shelters?.length})</strong></h2>
                </button>
            </div>

            {open && <ModalShelters setOpen={setOpen} search={search.submit ? search.query : null} />}
            <ModalCreatePost isOpen={openCreatePost} closeModal={closeModal} />
        </div>
    )
}

export default HomeNav