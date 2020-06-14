# Listen Together
Grab some friends, connect your Spotify account, and listen to music in sync with each other.

### Inspiration
I love making playlists and talking about music with my friends, and so I decided to expand upon that by allowing friends to hop in a room and all listen to music in sync with one another.

### What it does
Listen Together allows groups of people to listen to music in sync with one another via Spotify. When the group owner makes any change in the song they are listening to, anyone who is listening and in the group with receive those same changes. It allows for truly synced music listening, which stands in contrast to Spotify's built-in feature of playing a song that a friend is listening to.

### How I built it
Listen Together is built with React on the frontend and Node.js / Express running through Firebase functions on the backend. This was used purely to authenticate users with Spotify. In addition, I leveraged Firebase's realtime database to accomplish the live music syncing.

### Challenges I ran into
Data fetching and calling the Spotify API at the right times was the source of many of my bugs, as the nature of the application means that the client has to stay in constant sync with both a user's Spotify application on their phone/computer and the Firebase realtime database.

### Accomplishments that I'm proud of
Considering I worked alone and tackled an API I had never looked at before, I am quite proud of what I was able to accomplish. While I've used firebase in the past, I haven't worked on an application that was quite this realtime, and as a result there were many roadblocks I hadn't seen before that I was able to overcome.

### What I learned
I learned a lot about the Spotify API, as well as dipping my toes in dealing with OAuth for authentication. I hadn't used either of those things before.

### What's next for Listen Together
I was only able to implement public room sharing during the Hackathon, but I'd love to add functionality for users to send a private room link to only their friends. Possible integrations with other services could be neat as well, although I'm not positive about the feasibility of that.

### Built With
- chakra-ui
- firebase
- javascript
- react
- spotify
- typescript

### Try it out
listen-together-hf.web.app
