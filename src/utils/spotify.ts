const extractTrackId = (url: string) => {
  const regex = /\/track\/([^\/?]+)/; // Match the track ID after "/track/"
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    // Handle invalid or unsupported Spotify link format
    return;
    // throw new Error("Invalid or unsupported Spotify link format");
  }
};

async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
  });

  return await response.json();
}

async function addSongToPlaylist(trackId: string) {
  // const token = await getToken();
  // if (!token || !token.access_token) throw Error("Unauthorized");
  const body = JSON.stringify({
    uris: [`spotify:track:${trackId}`],
    position: 0,
  });

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.SPOTIFY_ACCESS_TOKEN },
      body,
    }
  );
  return await response.json();
}

export async function getTrackInfo(access_token: string, trackId: string) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  });

  return await response.json();
}

export default {
  extractTrackId,
  addSongToPlaylist,
};
