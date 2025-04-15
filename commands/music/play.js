const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from YouTube')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The song name or URL')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const query = interaction.options.getString('query');
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply({ content: 'Join a voice channel first!', ephemeral: true });

    const queue = await client.player.nodes.create(interaction.guild, {
      metadata: interaction.channel
    });

    try {
      await queue.connect(channel);
    } catch {
      return interaction.reply({ content: 'I couldn’t join your voice channel.', ephemeral: true });
    }

    const result = await client.player.search(query, {
      requestedBy: interaction.user
    });

    if (!result.tracks.length) return interaction.reply({ content: 'No results found.', ephemeral: true });

    queue.addTrack(result.tracks[0]);
    if (!queue.isPlaying()) await queue.node.play();

    await interaction.reply({ content: `🎵 Now playing: **${result.tracks[0].title}**` });
  },
};
