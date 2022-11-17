import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from "react-redux"
import { logOutUserAction } from "../../redux/slices/manageUsers/actions"

const LogoutButton = React.forwardRef((props, ref) => {
	const { logout } = useAuth0()
	const dispatch = useDispatch()

	const handleClick = () => {
		logout()
		dispatch(logOutUserAction())
	}

	return (
		<div className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-slate-200">
			<button ref={ref} onClick={handleClick}>
				{props.children}
			</button>
		</div>
	)
})

export default LogoutButton
