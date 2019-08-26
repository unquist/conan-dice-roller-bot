const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === '/roll') {
    //message.reply('Critical fail');
    //message.channel.send('FAIL');
    rollMessage(message);
  }
});

function logger(message)
{
  console.log(message);
}

//message reception code
function rollMessage(message)
{
  logger("someone sent a /roll message");
  message.channel.send('message receieved');
  /*  
			var data, channel_name, response_url, command, text, token,username, realName;

			data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
			//robot.logger.debug("data:"+util.inspect(data));
			command = data.command;
			//text = data.text;
			token = data.token;

			//robot.logger.debug("received token:["+token+"]");
			//robot.logger.debug("stored token is:["+process.env.HUBOT_SLASH_ROLL_TOKEN+"]");
      var tokenString = process.env.HUBOT_SLASH_ROLL_TOKEN;
      var tokenArray = tokenString.split(',');
      var authenticated = false;
      
      for(var i = 0; i < tokenArray.length; i++)
      {
        if(tokenArray[i] == token)
        {
          authenticated = true;
        }
      }
      
			if(!authenticated)
			{
				return res.json(getSimpleMsgDataWitoutAttachment("Incorrect authentication token. Did you remember to set the HUBOT_SLASH_ROLL_TOKEN to the token for your Slack slash command?"));
			}
			else
			{
				robot.logger.debug("Request authenticated.");
			}
			username = data.user_name;
			userId = data.user_id;
			realName = getRealNameFromId(userId);
			channel_name = data.channel_name;
			var helpMatch = data.text.match(/help/i);
			if(helpMatch != null)
			{
				return res.json(getSimpleMsgDataWitoutAttachment(getHelpText(),channel_name));
			}

      var madnessMatch = data.text.match(/madness/i);
      if(madnessMatch != null)
      {
        robot.logger.debug("Recieved madness request.");
        var msgData = getInteractiveMadnessMsg(channel_name);
        robot.logger.debug("msgData is:\n" + JSON.stringify(msgData));
        return res.json(msgData);
      }

			var macroMatch = data.text.match(/(deleteallmymacros|deletemacro|clearallmacros|getmacro|setmacro|\$)/i);
			//var macroMatch = data.text.match(new RegExp('clearallmacros\|getmacro\|setmacro\|'+MACRO_CHAR,"i"));
			var diceMatch = data.text.match(/(\d+)(d)(\d+)/ig);
			if(macroMatch != null)
			{
				var msgData = processMacroCommand(data.text,realName,username,channel_name);
				return res.json(msgData);
			}
			else if(diceMatch != null)
			{
				var msgData = processDiceCommandString(data.text,realName,channel_name);
				robot.logger.debug("msgData is:\n" + JSON.stringify(msgData));
        return res.json(msgData);
			}
			else
			{
				//no explicit macro command, and no dice roll command.
				//check if it's a macro request without the #
				macroMatch = data.text.match(/([\S]+)/i);
				if(macroMatch == null)
				{
					return res.json(getMsgData("No valid dice roll or macro command. Use _/roll help_ to see command options."));
				}
				var msgData = processMacroCommand(data.text,realName,username,channel_name);
				return res.json(msgData);
			}
      */
}






client.login(process.env.BOT_TOKEN);
