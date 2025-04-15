const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member')
    .addUserOption(option => option.setName('target').setDescription('User to ban').setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: 'You lack permission.', ephemeral: true });
    }
    const target = interaction.options.getUser('target');
    const member = await interaction.guild.members.fetch(target.id);
    await member.ban();
    interaction.reply(`${target.tag} was banned.`);
  }
};