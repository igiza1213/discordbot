const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('유저정보')
		.setDescription('유저정보를 알려줍니다!'),
	async execute(interaction) {
		await interaction.reply(`유저 태그: ${interaction.user.tag}
유저 아이디: ${interaction.user.id}`);
	},
};