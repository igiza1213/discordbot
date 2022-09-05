const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json"); //config.json에서 토큰을 가져옴
const fs = require("fs");

// 클라이언트 인텐스를 생성
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//명령어 분할
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// 클라이언트 준비
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);
