"# githubRepoSearch" 

Run the app by typing "parcel index.html" in terminal and open it on http://localhost:1234

The app shows the 'example' profile by default when opening on http://localhost:1234

Concerning time limitations, most of the code was written in Home.js file without creating and importing separate files for individual components (user info tile, repo table...). Also, only one .css file was used.

While the app is responsive and functions on smaller screens, some cases were not yet completely handled.

Navigation should be fully functional with app displaying user info in according to the username in the URL.

Possible improvements:
- table pagination
- sorting repositories by name or date (eg. last created or last updated)
- search data in table
- table hidden in mobile view (show only link to repo list)
- add spinner of sorts and render all info on the page at once for larger list of repos
- persist data locally
- code architecture improvements (put files in folders, create and import separate files for individual components)
- design improvements
