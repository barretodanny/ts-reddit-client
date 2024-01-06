import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Subreddit from "./pages/Subreddit/Subreddit";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditSubreddit from "./pages/EditSubreddit/EditSubreddit";
import SearchSubreddit from "./pages/SearchSubreddit/SearchSubreddit";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";
import Search from "./pages/Search/Search";
import Subreddits from "./pages/Subreddits/Subreddits";
import CreateSubreddit from "./pages/CreateSubreddit/CreateSubreddit";
import User from "./pages/User/User";
import UserComments from "./pages/UserComments/UserComments";
import UserPosts from "./pages/UserPosts/UserPosts";
import UserSubreddits from "./pages/UserSubreddits/UserSubreddits";
import EditUser from "./pages/EditUser/EditUser";
import Users from "./pages/Users/Users";
import NotFound from "./pages/NotFound/NotFound";

import Navbar from "./components/Navbar/Navbar";
import TopBtn from "./components/TopBtn/TopBtn";

function App() {
  return (
    <Router>
      <Navbar />
      <TopBtn />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/auth/login" element={<Login></Login>} />
        <Route path="/auth/register" element={<Register></Register>} />
        <Route path="/r/:name" element={<Subreddit></Subreddit>} />
        <Route path="/r/:name/create" element={<CreatePost></CreatePost>} />
        <Route path="/r/:name/edit" element={<EditSubreddit></EditSubreddit>} />
        <Route
          path="/r/:name/search"
          element={<SearchSubreddit></SearchSubreddit>}
        />
        <Route path="/r/:name/post/:id" element={<Post></Post>} />
        <Route path="/r/:name/post/:id/edit" element={<EditPost></EditPost>} />
        <Route path="/search" element={<Search></Search>} />
        <Route path="/subreddits" element={<Subreddits></Subreddits>} />
        <Route
          path="/subreddits/create"
          element={<CreateSubreddit></CreateSubreddit>}
        />
        <Route path="/u/:username" element={<User></User>} />
        <Route
          path="/u/:username/comments"
          element={<UserComments></UserComments>}
        />
        <Route path="/u/:username/posts" element={<UserPosts></UserPosts>} />
        <Route
          path="/u/:username/subreddits"
          element={<UserSubreddits></UserSubreddits>}
        />
        <Route path="/u/:username/edit" element={<EditUser></EditUser>} />
        <Route path="/users" element={<Users></Users>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </Router>
  );
}

export default App;
