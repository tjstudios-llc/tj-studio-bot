const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('Create a reaction role menu')
    .addStringOption(opt => opt.setName('role1').setDescription('First role name').setRequired(true))
    .addStringOption(opt => opt.setName('role2').setDescription('Second role name').setRequired(true)),
  async execute(interaction) {
    const role1 = interaction.options.getString('role1');
    const role2 = interaction.options.getString('role2');

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('reaction_roles')
        .setPlaceholder('Select a role')
        .addOptions([
          { label: role1, value: role1 },
          { label: role2, value: role2 }
        ])
    );

    await interaction.reply({ content: 'Choose a role:', components: [row] });
  }
};