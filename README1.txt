Holy Grail Game Database App
==============================================
README1 - Running the Code
==============================================

This project is a web app that displays game data from the RAWG game database, allowing users to search and filter for all kinds of games.
For any issues regarding running the code, please contact one of the Authors.

==============================================
Prerequisites:
==============================================
-Make sure you have the latest version of Node.js installed 
-Make sure you have npm (Node Package Manager)

==============================================
Setting up
==============================================
Open the code in Visual Code and install the following dependencies using the terminal commands:
  -npm install
  -npm install react-router-dom 
  -npm install firebase

=============================================
Running the Program
=============================================

To start the Web page, run the command:

  -npm run dev

You will see a link pop up with the name http://localhost:0000/ (some placeholder numbers replace 0000)
Click on this link in your terminal, and it should bring you to the webpage

=============================================
Data Collection
=============================================
Please see the README2.txt file to learn how to run this 

=============================================
Credit
=============================================

RAWG Video Game Database API - https://raawg.io/apidocs

────────────────────────────────────────────
1. Root Files
────────────────────────────────────────────
- App.jsx ................. Root React component; handles routes and layout.
- main.jsx ................ Entry point; renders <App /> to the DOM.
- App.css ................. Global styles.
- index.css ............... Tailwind and base style imports.
- firebase.js ............. Firebase configuration and app initialization.

────────────────────────────────────────────
2. Components: /src/components
────────────────────────────────────────────
- AccountDropdown.jsx ..... User menu with logout/profile access.
- Banner.jsx .............. Displays hero section or featured game.
- DisplaySearch.jsx ....... Shows game search results.
- GameModel.jsx ........... Modal popup for detailed game info.
- GamesByGenre.jsx ........ Displays games filtered by selected genre.
- GenreList.jsx ........... Sidebar listing all game genres.
- Header.jsx .............. Main header with navigation and search.
- Login.jsx ............... Login/sign-up form and auth logic.
- Trending.jsx ............ Shows trending or top-rated games.
- WelcomePage.jsx ......... Landing page with welcome message.

────────────────────────────────────────────
3. Pages: /src/Pages
────────────────────────────────────────────
- Forum.jsx ............... Displays and allows participation in threads.
- Home.jsx ................ Homepage shown after login.
- Lists.jsx ............... Lets users manage favorites, played, etc.
- Profile.jsx ............. View and update user profile info.
- PublicListsPage.jsx ..... View other users’ public lists.
- Recommendations.jsx ..... Shows personalized game recommendations.
- Reviews.jsx ............. Displays user-written reviews for games.

────────────────────────────────────────────
4. Context: /src/Context
────────────────────────────────────────────
- ThemeContext.jsx ........ (Optional) For managing theme or dark mode.
- VisibilityContext.jsx ... Controls visibility of genre sidebar.

────────────────────────────────────────────
5. Services: /src/Services
────────────────────────────────────────────
- CollectData.js .......... Helper script to manually fetch data from APIs.
- ForumService.js ......... Manages Firestore data for forum posts and replies.
- GameAPI.js .............. Fetches games, genres, search results from RAWG API.
- GlobalAPI.jsx ........... (Optional) Shared API functions if applicable.

────────────────────────────────────────────
6. Utilities: /src/utils
────────────────────────────────────────────
- listStorage.js .......... Handles saving/loading user game lists to Firestore/localStorage.
- profileStorage.js ....... Firestore logic for profile info.
- recommend.js ............ Logic for AI/ML recommendations (e.g., filtering logic, matching games).

────────────────────────────────────────────
7. Tests: /tests
────────────────────────────────────────────
- listStorage.test.js ..... Unit test for saving/loading user lists.
- searchUtils.test.js ..... Unit test for game search logic.
- saveAndRetrievaList.test.js .. Integration test for Firebase-based list storage.


Authors: Connor Kepilino, Chris Avila, Kevin Huynh, Pritam Hegde



