require("dotenv").config();

import { App, LogLevel } from "@slack/bolt";
import shopifyApi from "./utils/spotify";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  //   socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this,
  logLevel: LogLevel.DEBUG,
  customRoutes: [],
});

app.message(
  /.*\bmi\s+(tema|cancion|canción)\b\s+(favorita|favorito|fav)\b.*/gi,
  async ({ message, say }) => {
    try {
      //@ts-ignore
      const trackId = shopifyApi.extractTrackId(message.text);
      if (trackId && process.env.SPOTIFY_ACCESS_TOKEN) {
        await shopifyApi.addSongToPlaylist(trackId);
        await say(`Ya la agregué a la playlist, bobita 👀`);
      }
    } catch (err) {
      console.error(err);
      await say(`No pusiste ninguna canción tonta 😢`);
    }
  }
);

app.command("/add", async ({ command, ack, respond, say }) => {
  await ack();

  const trackId = shopifyApi.extractTrackId(command.text);
  if (!trackId) await say("Oops! No mandaste un link 🪦");
  if (trackId) {
    try {
      const response = await shopifyApi.addSongToPlaylist(trackId);
      console.log({ response });
      await say("Listooo, 🫶🏼");
    } catch (err) {
      console.error({ err });
      await say("U, no pude agregarla 🤕");
    }
  }
});

(async () => {
  await app.start(4000);
  console.log("⚡️ up and running");
})();
