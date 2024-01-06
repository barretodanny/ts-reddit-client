import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";
import { deleteSession, deleteUser } from "../../api";

import styles from "./DeleteAccountBtn.module.css";

interface DeleteAccountBtnProps {
  user: User;
}

function DeleteAccountBtn({ user }: DeleteAccountBtnProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (result) {
      deleteUser(user._id);
      await deleteSession();
      navigate("/");
      navigate(0);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.deleteBtn}>
      DELETE USER
    </button>
  );
}

export default DeleteAccountBtn;
