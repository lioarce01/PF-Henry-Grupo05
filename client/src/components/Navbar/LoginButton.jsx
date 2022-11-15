import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUserMutation } from '../../redux/api/users';

const LoginButton = () => {
	const { loginWithPopup } = useAuth0()
	
	return (
		<div>
			<button onClick={loginWithPopup} className="text-[#201008] font-bold">Log In</button>
		</div>
	)
}

export default LoginButton
