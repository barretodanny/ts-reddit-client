import { useNavigate } from "react-router-dom";
import { deleteSubreddit } from "../../api";
import { Subreddit } from "../../types/types";

import styles from "./DeleteSubredditBtn.module.css";

interface DeleteSubredditBtnProps {
  subreddit: Subreddit;
}

function DeleteSubredditBtn({ subreddit }: DeleteSubredditBtnProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = window.confirm(
      "Are you sure you want to delete this subreddit?"
    );

    if (result) {
      await deleteSubreddit(subreddit._id);
      navigate("/");
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.deleteBtn}>
      DELETE
    </button>
  );
}

export default DeleteSubredditBtn;
