const { checkYouTube } = require('../utils/youtubeChecker');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Bot ready as ${client.user.tag}`);
    setInterval(() => checkYouTube(client), 60000); // Check every minute
  }
};

// utils/youtubeChecker.js
const { google } = require('googleapis');
const youtube = google.youtube('v3');
let lastVideoId = null;

async function checkYouTube(client) {
  const res = await youtube.search.list({
    key: process.env.YOUTUBE_API_KEY,
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    part: 'snippet',
    order: 'date',
    maxResults: 1
  });

  const latest = res.data.items[0];
  if (latest.id.videoId !== lastVideoId) {
    lastVideoId = latest.id.videoId;
    const channel = client.channels.cache.find(c => c.name === 'youtube-updates');
    if (channel) {
      channel.send(`New video uploaded: https://youtu.be/${latest.id.videoId}`);
    }
  }
}

module.exports = { checkYouTube };