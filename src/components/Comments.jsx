import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  console.log(comments);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.post("/users/getcomments", {
        rid: id,
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post("/users/addcomments", {
        rid: id,
        name: user.userId,
        text: newComment,
        replies: [],
      });
      if (response.status == 200) {
        toast.success("Comment Added", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (replyText.trim() === "") return;

    try {
      const response = await axios.post(
        `/users/comments/${commentId}/replies`,
        {
          usern: user.userId,
          text: replyText,
        }
      ); // Replace with your actual API endpoint

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, response.data.reply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyText("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto mt-8 p-4">
      <h3 className="m-3 text-2xl border-b-2 p-1 border-black">Comments</h3>
      <div className="mb-4">
        <textarea
          className="w-full mt-3 p-2 border rounded"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => handleCommentSubmit()}
        >
          Comment
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  alt=""
                  src="https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?rs=1&pid=ImgDetMain"
                  className="w-8 h-8  rounded-full"
                />
              </div>
              <div key={comment.id} className="ml-4 flex-grow">
                <div className="bg-gray-100 p-3 rounded">
                  <span className="text-slate-600">{comment.user.username}</span>
                  <p>{comment.text}</p>
                </div>
                {/* <div className="mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => setReplyTo(comment.id)}
                  >
                    Reply
                  </button>
                </div> */}
                {/* {comment.replies.map((reply) => (
                  <div key={reply.id} className="ml-6 bg-gray-200 p-3 rounded">
                    <p>{reply.text}</p>
                  </div>
                ))} */}
              </div>
            </div>
            {/* {replyTo === comment.id && (
              <div className="flex items-center mt-2">
                <textarea
                  className="w-full p-2 border rounded mr-2"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => handleReplySubmit(comment.id)}
                >
                  Reply
                </button>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
