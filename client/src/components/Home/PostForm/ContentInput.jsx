import React from 'react';


const ContentInput = ({content, setContent}) => {

    const onChange = (e) => {
        setContent(e.target.value)
    } 

    return (
			<div className="grid grid-cols-1 space-y-2">
				<label className="text-md font-bold text-[#462312] tracking-wide">
					Content
				</label>
				<textarea
					value={content}
					onChange={onChange}
					className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-[#fff5f4] bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-out m-0 focus:text-[#462312] focus:bg-[#ffedeb] focus:border-gray-600 focus:outline-none"
					rows="3"></textarea>
			</div>
		)
}
 
export default ContentInput;