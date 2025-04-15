const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createembed')
    .setDescription('Creates a custom embed message')
    .addStringOption(opt => opt.setName('title').setDescription('Embed title').setRequired(true))
    .addStringOption(opt => opt.setName('description').setDescription('Embed description').setRequired(true)),
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');

    const embed = new EmbedBuilder().setTitle(title).setDescription(description).setColor(0x00AE86);
    await interaction.reply({ embeds: [embed] });
  }
};