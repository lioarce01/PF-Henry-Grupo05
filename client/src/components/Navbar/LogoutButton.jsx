import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
	const { logout } = useAuth0()
	return (
		<div className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-slate-200">
			<button onClick={() => logout()}>Log Out</button>
		</div>
	)
}

export default LogoutButton
