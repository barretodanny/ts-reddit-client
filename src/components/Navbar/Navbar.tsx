import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import { getLoggedInUser } from "../../api";
import NavSearchBar from "../NavSearchBar/NavSearchBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<User>();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response.status === 200) {
          const user: User = response.data;
          setLoggedInUser(user);
        }
      } catch (error) {
        // error fetching logged in user
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <nav>
      <div>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/subreddits"}>Subreddits</Link>
          <Link to={"/users"}>Users</Link>
        </div>
        <div>
          <button>Discover</button>
          <div>
            <Link to={"/subreddits"}>Subreddits</Link>
            <Link to={"/users"}>Users</Link>
          </div>
        </div>
      </div>

      <NavSearchBar />

      {loggedInUser ? (
        <div>
          <button>
            <span>{loggedInUser.username}</span>
          </button>
          <div>
            <Link to={`/u/${loggedInUser.username}`}>View Profile</Link>
            <Link to={`/u/${loggedInUser.username}/edit`}>Edit Profile</Link>
            <Link to={"/subreddits/create"}>Create Subreddit</Link>
            <Link to={`/u/${loggedInUser.username}/subreddits`}>
              View Your Subreddits
            </Link>
            <Link to={`/u/${loggedInUser.username}/posts`}>
              View Your Posts
            </Link>
            <Link to={`/u/${loggedInUser.username}/comments`}>
              View Your Comments
            </Link>
            <LogoutBtn />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link to={"/auth/login"}>Login</Link>
            <Link to={"/auth/register"}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
