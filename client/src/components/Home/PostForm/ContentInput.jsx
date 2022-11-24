import React from 'react';


const ContentInput = ({content, setContent}) => {

    const onChange = (e) => {
        setContent(e.target.value)
    } 

    return (
			<div className="grid grid-cols-1 space-y-2">
				<label className="text-md font-bold text-[#979b9c] tracking-wide">
					Content
				</label>
				<textarea
					value={content}
					onChange={onChange}
					className="resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-[#fffaf9] 
					bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-out m-0 focus:outline-none"
					rows="3"></textarea>
			</div>
		)
}
 
export default ContentInput;