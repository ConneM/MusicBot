const client = require("../index.js");
const { DisTube } = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('./resources/config.yml', 'utf8'))

client.distube = new DisTube(client, {
      emitNewSongOnly: config.CONFIG.MUSIC.EMIT_NEW_SONG_ONLY,
      leaveOnEmpty: config.CONFIG.MUSIC.LEAVE_ON_EMPTY,
      leaveOnFinish: config.CONFIG.MUSIC.LEAVE_ON_FINISH,
      leaveOnStop: config.CONFIG.MUSIC.LEAVE_ON_STOP,
      savePreviousSongs: true,
      emitAddListWhenCreatingQueue: false,
      searchSongs: 0,
      nsfw: config.CONFIG.MUSIC.NSFW,
      emptyCooldown: config.CONFIG.MUSIC.EMPTY_COOLDOWN,
      ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: 'highestaudio',
        format: 'audioonly',
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
      },
      plugins: [
        new SoundCloudPlugin(),
        new YtDlpPlugin()
      ],
})