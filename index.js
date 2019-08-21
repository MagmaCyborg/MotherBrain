const Discord = require('discord.js');

const prefix = "<";
const version = "1.1.0";

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Mother Brain online!');
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel)    return;
    channel.send(`Benvenuto nel server, ${member}!`);
})

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        case 'help':
            const help = new Discord.RichEmbed()
            .setTitle('COMANDI')
            .addField('help', 'Lista dei comandi e breve descrizione')
            .addField('info user', 'Dà informazioni riguardo all\'utente')
            .addField('info server', 'Dà informazioni riguardo al server')
            .addField('permission', 'Dà informazioni riguardo ai permessi per certi comandi')
            .addField('clear', 'Cancella un determinato numero di messaggi nella chat')
            .addField('kick', 'Espelle un membro del server [SOLO AMMINISTRATORE]')
            .addField('ban', 'Banna un membro del server [SOLO AMMINISTRATORE]')
            .setFooter('Prefisso: ' + prefix)
            .setColor(0xFF0000);
            message.channel.sendEmbed(help);
            break;
        case 'info':
            if (!args[1])    return message.channel.send('Argomenti non definiti!');
            if (args[1] === 'user') {
                let myrole = message.guild.roles.find(role => role.name === "Administrator");
                const user = new Discord.RichEmbed()
                .setTitle('INFORMAZIONI UTENTE')
                .addField('Nome', message.author.username)
                .addField('Ruolo', myrole)
                // .addField('Permission for advanced commands', perm)
                .setThumbnail(message.author.avatarURL)
                .setColor(0x48C9B0);
                message.channel.sendEmbed(user);
            }
            if (args[1] === 'server') {
                const serv = new Discord.RichEmbed()
                .setTitle('INFORMAZIONI SUL SERVER')
                .addField('Nome', message.guild.name)
                .addField('Versione', version)
                .setColor(0xF39C12);
                message.channel.sendEmbed(serv);
            }
            break;
        case 'permission':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                message.reply('Hai il permesso di usare comandi riservati!');
            } else {
                message.reply('Non hai il permesso di usare comandi riservati!');
            }
            break;
        case 'kick':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                let member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(member.displayName + ' è stato mangiato da dei metroid!')
                })
            } else {
                message.reply('Non hai il permesso di usare questo comando!');
            }
            break;
        case 'ban':
            if (message.member.roles.find(role => role.name === 'Administrator')) {
                let member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.channel.send(member.displayName + ' è stato bannato!');
                })
            } else {
                message.reply('Non hai il permesso di usare questo comando!');
            }
            break;
        case 'clear':
            if (!args[1])   return message.reply('Errore! Definire il numero di messaggi da cancellare')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

client.login(process.env.token);
