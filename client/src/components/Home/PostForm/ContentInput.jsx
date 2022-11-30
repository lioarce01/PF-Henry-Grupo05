import React from 'react';


const ContentInput = ({content, setContent}) => {

    const onChange = (e) => {
        setContent(e.target.value)
    } 

    return (
			<div className="grid grid-cols-1 space-y-2">
				<label className="text-md font-bold text-[#979b9c] dark:text-[#F0EEEE] tracking-wide">
					Content
				</label>
				<textarea
					value={content}
					onChange={onChange}
					className="resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 dark:text-[#F0EEEE] bg-[#fffaf9] dark:bg-[#1B1A1F]
					bg-clip-padding border border-solid border-gray-300 dark:border-[#AFB3B4] rounded transitionease-in-out m-0 focus:outline-none"
					rows="3"></textarea>
			</div>
		)
}
 
export default ContentInput;