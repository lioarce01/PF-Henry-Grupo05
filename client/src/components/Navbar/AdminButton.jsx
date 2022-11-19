import React from "react"

const AdminButton = React.forwardRef((props, ref) => {
	return (
		<div className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-slate-200">
			<button to="/admin" ref={ref}>
				{props.children}
			</button>
		</div>
	)
})

export default AdminButton
