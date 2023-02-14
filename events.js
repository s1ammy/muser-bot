module.exports.registerPlayerEvents = (player) => {

    player.on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.on('connectionError', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on('trackStart', (queue, track) => {
        var youtubeThumbnail = require('youtube-thumbnail');
        var url = `${track.url}`;
        var data = youtubeThumbnail(url);
        var thumbnail = data.high.url;
        const showTrack = {
            color: 0x303136,
            title: `${track.title}`,
            url: url,
            fields: [
                {
                    name: 'Track duration',
                    value: `${track.duration}`,
                },
            ],
            image: {
                url: thumbnail
            },
        };
        queue.metadata.send({ embeds: [showTrack] });
    });

    player.on('trackAdd', (queue, track) => {
        queue.metadata.send(`Track **${track.title}** queued!`);
    });

    player.on('botDisconnect', (queue) => {
        queue.metadata.send('I was manually disconnected from the voice channel, clearing queue!');
    });

    player.on('channelEmpty', (queue) => {
        queue.metadata.send('Nobody is in the voice channel, leaving...');
    });

    player.on('queueEnd', (queue) => {
        queue.metadata.send('Queue finished!');
    });

};
