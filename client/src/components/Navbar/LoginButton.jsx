import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUserMutation } from '../../redux/api/users';

const LoginButton = () => {
	const { loginWithPopup, user } = useAuth0()

	const [createUser, {}] = useCreateUserMutation();

	const manageClick = async () => {
		await loginWithPopup()
		console.log(user);
		//createUser(user);

	}
	return (
		<div>
			<button onClick={manageClick}>Log In</button>
		</div>
	)
}

export default LoginButton
