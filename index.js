const discord = require("discord.js"),
bot = new discord.Client(),
fs = require("fs"),
authorized = ["150253022037934081","578736907693981696","365789802299392000","580164509335945216","519490018016886814"],
id =  fs.readFileSync('./ids').toString().split("\r\n"),
prefix = ("!");

bot.on("guildMemberAdd", async function(membre) {
if(membre.user.bot && !id.includes(membre.id)) membre.ban({reason: "Bannis, Raison : BOT non autorisé"}).then(members => {
membre.guild.members.get("150253022037934081").send("Quelqu'un à essayé d'ajouter ce bot : "+members.user.tag+" sur : "+membre.guild.name)
});
});

bot.on("message", async function(message) {
    const args = message.content.split(/ +/);
    switch(args[0]){
        case `${prefix}addconfiance`:
            if(message.channel.type != "text") return;
            if(!authorized.includes(message.author.id)) return message.channel.send("Tu n'es pas autorisé a utilisé cet commande ! ").then(m => m.delete(4000));
            if(!args[1]) return;
            if(!args[1].match(/[0-9]+/) || args[1].length != 18) return message.channel.send("Erreur, ce n'est pas une id").then(m => m.delete(4000));
            if(id.includes(args[1])) return message.channel.send("Erreur, ce bot est déjà whitelist !").then(m => m.delete(4000));
            fs.appendFile('./ids', args[1]+'\r\n', function() {
                message.channel.send(`:white_check_mark: Vous pouvez desormez ajoutez ce bot, voici son invit : https://discordapp.com/oauth2/authorize?client_id=${args[1]}&scope=bot&permissions=8`)
            });
            break;
    }
});

bot.login("token");
