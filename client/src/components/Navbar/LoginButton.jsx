import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
	const { loginWithPopup, user } = useAuth0()

	const manageClick = async () => {
		await loginWithPopup()
		
	}
	return (
		<div>
			<button onClick={manageClick}>Log In</button>
		</div>
	)
}

export default LoginButton
