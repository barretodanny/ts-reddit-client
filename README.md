# TS-Reddit-Client

Frontend for Reddit Clone App.

[View Back End repo for this project](https://github.com/barretodanny/ts-reddit-server)

[View Reddit Post Bots repo for this project](https://github.com/barretodanny/ts-reddit-bots)

The app supports the following features.

## User Accounts

You can create an account at `/auth/register`.

Usernames and emails must be unique for each user. You currently do not need to verify your account to access all app features, meaning you do not need to enter a real email address.

Once you have registered an account, you can login at `/auth/login`.

You can view any user's profile by visiting `/u/{username}`. On this page you can also view a list of comments/posts/subreddits that this user has created.

You can also edit your own profile by visiting `/u/{username}/edit`. Allows you to update your username, email. and password. Must be logged in to your account to edit it.

## Authentication

JWTs are used to handle authentication. These are stored in the browser's cookies, and are sent with every request made to the backend. Logging in sets these cookies in the browser, and also creates a session on the backend. Logging out invalidates the session, and clears the browsers cookies.

Certain features require a logged in account, such as create new content (subreddits, posts, comments), or updating existing content (user profile, subreddits, posts, comments), and also voting.

## Subreddits

Logged in users are allowed to create new subreddits by visiting `/subreddits/create`. Each subreddit must have a unique name. You can update the name of subreddits you can created. There is no limit to how many subreddits one user can create.

You can view a list of subreddits at `/subreddits`.

## Posts

Logged in users are allowed to create new posts on a given subreddit by visiting `/r/{subredditname}/create`. You can update the title / content of posts you have created. There is no limit to how many posts a user can make, or how many posts can exist on a subreddit.

You can view a list of all posts (any subreddit) at the home page `/`.

You can view a list of posts for a specific subreddit at `/r/{subredditname}`.

You can view a list of posts a specific user has created at `/u/{username}/posts`.

## Comments

Logged in users are allow to create comments on a given post by visiting `/r/{subredditname}/{postid}`. You can update the content of the comments you have created. There is no limit to how many comments a post can have, or how many comments a user can make.

You can also reply to comments, allowing nested comment chains.

You can view a list of comments a specific user has created at `/u/{username}/comments`.

## Voting

Logged in users are allowed to upvote/downvote posts/comments. They can also edit the vote, by clicking the opposite vote button, or remove their vote by reclicking the same vote button. Votes are automatically fetched and displayed to the user if they are logged in and have voted before.

## Searching

Supports to ability to filter users, subreddits, and posts based on a provided substring. The search will return results that contain the search substring in the username/subreddit name/post title.

You can search for posts/subreddits/users at `/search`.

You can search for posts in a specific subreddit at `/r/{subredditname}/search`.

## Sorting

Supports the ability to sort users and subreddits from newest to oldest, and also in alphabetical or reverse alphabetical order.

Supports the ability to sort posts and comments from newest to oldest, and also highest score to lowest score, or lowest score to highest score.

## Pagination

Supports pagination when viewing a list of results. Each page displays up to 10 results, and you are able to go forward to the next page to receive the next set of results, or go backwards to the previous page to receive the previous set of results. Also allows users to jump back to the first page, or straight to the last page in just one click.
