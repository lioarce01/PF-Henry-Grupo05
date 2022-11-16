import React from "react"
import { useSetFollowMutation } from "../../redux/api/users"

const setFollow = () => {
	const [setFollow, { data, isLoading, error }] = useSetFollowMutation()

	// onclick function to set follow to true or false depending on the current state of the follow
	const onClick = () => {
		setFollow({ id: 1, follow: true })
	}

	return (
		<div>
			<button>Follow</button>
		</div>
	)
}

export default setFollow
