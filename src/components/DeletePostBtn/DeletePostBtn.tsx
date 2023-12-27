import { useNavigate } from "react-router-dom";
import { Post } from "../../types/types";
import { deletePost } from "../../api";

import styles from "./DeletePostBtn.module.css";

interface DeletePostBtnProps {
  post: Post;
}

function DeletePostBtn({ post }: DeletePostBtnProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = window.confirm("Are you sure you want to delete this post?");

    if (result) {
      await deletePost(post._id);
      navigate("/");
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.deleteBtn}>
      DELETE
    </button>
  );
}

export default DeletePostBtn;
