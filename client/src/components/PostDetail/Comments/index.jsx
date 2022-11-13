import React from 'react'
import AddComment from './AddComment';
import Comment from './Comment';


const Comments = ({ postId, details }) => {
  return (
    <div>
      <AddComment postId={postId} />
      {details.Comment &&
        details.Comment.map((comment) => {
          return (
            <Comment
              key={comment.id}
              postId={postId}
              author={comment.author}
              content={comment.content}
              id={comment.id}
            />
          );
        })}
    </div>
  )
}


export default Comments
