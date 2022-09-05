const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("셀렉트메뉴")
    .setDescription("셀렉트 메뉴를 호출합니다!"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("선택되지 않음")
        .addOptions([
          {
            label: "하프",
            description: "sellect 1 (embed)",
            value: "half",
          },
          {
            label: "풀",
            description: "sellect 2",
            value: "full",
          },
          {
            label: "콜",
            description: "설명3(아직)",
            value: "call",
          },
          {
            label: "다이",
            description: "설명4(미구현)",
            value: "die",
          },
        ])
    );

    await interaction.reply({ content: "셀렉트메뉴 호출", components: [row] });

    const filter = (interaction) => {
      return interaction.customId === "select";
    };

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60 * 1000,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "select") {
        const selectedValue = interaction.values[0];
        if (selectedValue === "call") {
          

          interaction.channel.reply("")
          interaction.deferUpdate();
        } else if (selectedValue === "full"){
          interaction.reply({
            content: selectedValue + " 기능이 구현되지 않았어!",
            ephemeral: true,
          });
        }
      }
    });

    collector.on("end", async (collect) => {
      console.log("시간초과!");
    });
  },
};