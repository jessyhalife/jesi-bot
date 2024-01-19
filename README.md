## JESI BOT

## Mesasges

Every time a message with `Mi tema/cancion/canción favorito/favorita/fav` with a `spotify link` is sent, we will try to extract `trackId` and add it to spotify playlist

## Commands

### /add [spotify trackId link]

Use the `/add` followed by a spotify link to add track to spotify


## Environment variables

- Slackbot app secrets
- Spotify app secrets
[ ] TODO: handle Authorization flow to get the SPOTIFY_ACCESS_TOKEN