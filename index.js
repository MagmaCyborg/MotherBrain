const Discord = require('discord.js');
const {
    prefix, 
    token,
    version,
} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Mother Brain online!');
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel)    return;
    channel.send(`Welcome to the server, ${member}!`);
})

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        case 'help':
            const help = new Discord.RichEmbed()
            .setTitle('COMMANDS')
            .addField('help', 'List of all the commands and how they work')
            .addField('info user', 'Gives information about the user')
            .addField('info server', 'Gives information about the server')
            .addField('permission', 'Gives information about advanced permission')
            .addField('kick', 'Admin and moderator only; kicks a member')
            .addField('ban', 'Admin and moderator only; bans a member')
            .setFooter('Prefix for the commands: ' + prefix)
            .setColor(0xFF0000);
            message.channel.sendEmbed(help);
            break;
        case 'info':
            if (!args[1])    return message.channel.send('No arguments defined!');
            if (args[1] === 'user') {
                let myrole = message.guild.roles.find(role => role.name === "Administrator");
                const user = new Discord.RichEmbed()
                .setTitle('USER INFORMATION')
                .addField('Name', message.author.username)
                .addField('Role', myrole)
                // .addField('Permission for advanced commands', perm)
                .setThumbnail(message.author.avatarURL)
                .setColor(0x48C9B0);
                message.channel.sendEmbed(user);
            }
            if (args[1] === 'server') {
                const serv = new Discord.RichEmbed()
                .setTitle('SERVER INFORMATION')
                .addField('Name', message.guild.name)
                .addField('Version', version)
                .setColor(0xF39C12);
                message.channel.sendEmbed(serv);
            }
            break;
        case 'permission':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                message.reply('You have permission to use advanced commands!');
            } else {
                message.reply('You do not have permission to use advanced commands!');
            }
            break;
        case 'kick':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                let member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(member.displayName + ' has been eaten by some metroids!')
                })
            } else {
                message.reply('You do not have permission for this command');
            }
            break;
        case 'ban':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                let member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.channel.send(member.displayName + ' has been banned!');
                })
            } else {
                message.reply('You do not have permission for this command');
            }
            break;
        case 'clear':
            if (!args[1])   return message.reply('Error! Please define how many messages you want to delete')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

client.login(process.env.token);
