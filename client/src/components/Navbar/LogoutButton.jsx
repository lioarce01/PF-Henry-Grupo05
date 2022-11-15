import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
	const { logout } = useAuth0()
	return (
		<div>
			<button onClick={() => logout()}>Log Out</button>
		</div>
	)
}

export default LogoutButton
