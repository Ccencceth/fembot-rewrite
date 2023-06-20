require("dotenv").config();
const { clientId, ononGuildId, token } = process.env;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray, ononCommandArray } = client;

    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        if (folder === "ononjoos") {
          const command = require(`../../commands/${folder}/${file}`);
          commands.set(command.data.name, command);
          ononCommandArray.push(command.data.toJSON());
          console.log(
            `Onon Command: ${command.data.name} has been passed through the handler`
          );
        } else {
          const command = require(`../../commands/${folder}/${file}`);
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(
            `Command: ${command.data.name} has been passed through the handler`
          );
        }
      }
    }

    const rest = new REST({ version: "9" }).setToken(token);
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: commandArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
    try {
      console.log("Started refreshing onon (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, ononGuildId), {
        body: ononCommandArray,
      });

      console.log("Successfully reloaded onon (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
