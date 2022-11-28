import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithPopup } = useAuth0()
	
	return (
		<div className="items-center px-4 py-2 mr-4 text-white bg-[#d6635f] rounded-2xl hover:bg-[#e76b67] transition duration-300">
			<button onClick={loginWithPopup} className="px-2 font-bold">
				Login
			</button>
		</div>
	)
}

export default LoginButton
