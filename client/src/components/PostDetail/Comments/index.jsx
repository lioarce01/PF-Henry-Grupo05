import React from 'react'
import { PuffLoader } from 'react-spinners';
import AddComment from './AddComment';
import Comment from './Comment';

const Comments = ({ postId, details, isFetching, postAuthorId }) => {
	
  return (
		<div>
			<AddComment postId={postId} />
			{isFetching && (
				<div className="w-full">
					<PuffLoader className="mx-auto" color="#462312" loading size={50} />
				</div>
			)}
			{details.Comment &&
				details.Comment.map((comment) => {
					return (
						<Comment
						postAuthorId={postAuthorId}
							key={comment.id}
							postId={postId}
							author={comment.author}
							content={comment.content}
							id={comment.id}
						/>
					)
				})}
		</div>
	)
}


export default Comments
