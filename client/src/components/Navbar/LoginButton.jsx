import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithPopup } = useAuth0()
	
	return (
		<div>
			<button onClick={loginWithPopup} className="text-[#201008] font-bold">Log In</button>
		</div>
	)
}

export default LoginButton
