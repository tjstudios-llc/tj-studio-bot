module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'Error executing command.', ephemeral: true });
        }
      } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'reaction_roles') {
          const roleName = interaction.values[0];
          const role = interaction.guild.roles.cache.find(r => r.name === roleName);
          if (!role) return interaction.reply({ content: 'Role not found.', ephemeral: true });
  
          if (interaction.member.roles.cache.has(role.id)) {
            await interaction.member.roles.remove(role);
            await interaction.reply({ content: `Removed role ${role.name}`, ephemeral: true });
          } else {
            await interaction.member.roles.add(role);
            await interaction.reply({ content: `Added role ${role.name}`, ephemeral: true });
          }
        }
      }
    }
  };