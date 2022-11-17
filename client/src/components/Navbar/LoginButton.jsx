import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUserMutation } from '../../redux/api/users';

const LoginButton = () => {
	const { loginWithPopup } = useAuth0()
	
	return (
		<div>
			<button onClick={loginWithPopup} className="text-[#201008] border border-[#201008] w-[75px] h-[30px] rounded-[20px] font-bold hover:bg-[#201008] hover:text-white">Log In</button>
		</div>
	)
}

export default LoginButton
