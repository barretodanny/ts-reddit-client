import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import { getLoggedInUser } from "../../api";

import { AiOutlineMenu } from "react-icons/ai";
import { BiUserCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import NavSearchBar from "../NavSearchBar/NavSearchBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

import styles from "./Navbar.module.css";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response.status === 200) {
          const user: User = response.data;
          setLoggedInUser(user);
          setShowContent(true);
        }
      } catch (error) {
        // error fetching logged in user
        setShowContent(true);
      }
    };

    fetchLoggedInUser();
  }, []);

  if (showContent) {
    return (
      <nav className={styles.container}>
        <div className={styles.left}>
          <AiOutlineMenu
            size={25}
            className={`${styles.moreIcon} ${styles.menuIcon}`}
          />
          <div className={styles.mobileLinks}>
            <Link to={"/"} className={styles.homeLink}>
              Home
            </Link>
            <Link
              to={"/subreddits"}
              className={`${styles.homeLink} ${styles.mobileLink}`}
            >
              Subreddits
            </Link>
            <Link
              to={"/users"}
              className={`${styles.homeLink} ${styles.mobileLink}`}
            >
              Users
            </Link>
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Discover</button>
            <div className={styles.dropdownContent}>
              <Link to={"/subreddits"} className={styles.dropdownLink}>
                Subreddits
              </Link>
              <Link to={"/users"} className={styles.dropdownLink}>
                Users
              </Link>
            </div>
          </div>
        </div>

        <NavSearchBar />

        {loggedInUser ? (
          <div className={styles.userDropdown}>
            <button className={styles.userDropdownBtn}>
              <BiUserCircle size={30} className={styles.userIcon} />
              <span className={styles.usernameText}>
                {loggedInUser.username}
              </span>
            </button>
            <div className={styles.userDropdownContent}>
              <Link
                to={`/u/${loggedInUser.username}`}
                className={styles.userDropdownOption}
              >
                View Profile
              </Link>
              <Link
                to={`/u/${loggedInUser.username}/edit`}
                className={styles.userDropdownOption}
              >
                Edit Profile
              </Link>
              <Link
                to={"/subreddits/create"}
                className={styles.userDropdownOption}
              >
                Create Subreddit
              </Link>
              <Link
                to={`/u/${loggedInUser.username}/subreddits`}
                className={styles.userDropdownOption}
              >
                View Your Subreddits
              </Link>
              <Link
                to={`/u/${loggedInUser.username}/posts`}
                className={styles.userDropdownOption}
              >
                View Your Posts
              </Link>
              <Link
                to={`/u/${loggedInUser.username}/comments`}
                className={styles.userDropdownOption}
              >
                View Your Comments
              </Link>
              <LogoutBtn />
            </div>
          </div>
        ) : (
          <div className={styles.auth}>
            <BiDotsHorizontalRounded size={30} className={styles.moreIcon} />
            <div className={styles.authBtns}>
              <Link
                to={"/auth/login"}
                className={`${styles.authBtn} ${styles.login}`}
              >
                Login
              </Link>
              <Link
                to={"/auth/register"}
                className={`${styles.authBtn} ${styles.signup}`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
