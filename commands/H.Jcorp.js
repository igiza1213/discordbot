const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버정보')
		.setDescription('서버정보를 알려줍니다!'),
	async execute(interaction) {
		await interaction.reply(`서버 이름: ${interaction.guild.name}
총 인원수: ${interaction.guild.memberCount}`);
	},
};