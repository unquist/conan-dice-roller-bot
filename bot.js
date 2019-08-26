const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  
  if (message.content.startsWith('/roll')) {
    //message.reply('Critical fail');
    //message.channel.send('FAIL');
	logger("someone sent a /roll message");
  	rollMessage(message);
  }
  
});

function logger(message)
{
  console.log(message);
}

function getHelpText()
{
			var helpText = "Usage: _*/roll XdY([+|-]#) (adv|advantage|dis|disadvantage) (label)*_";
			helpText += "\nX is the number of dice, and Y is the number of sides.";
			helpText += "\nOnly the first paramter, e.g. XdY, is required.";
			helpText += "\nDice roller will recognize a critical hit (natural 20) and miss (natural 1) when rolling a 1d20.";
			helpText += "\nYou can string together as many dice rolls as you want (see example below).";
			helpText += "\n\n_*Examples:*_";
			helpText += "\n`/roll 3d6+2`    (Rolls three six-sided dice and adds two to the result)";
			helpText += "\n`/roll 4d100-7 adv`    (Rolls four hundred-sided dice twice and takes the higher result, then substracts seven)";
			helpText += "\n`/roll 1d4 dis`    (Rolls a single four-sided die twice and takes the lower result.)";
			helpText += "\n`/roll 1d20+1 to hit with sword 2d8 slashing damage`    (Rolls a single d20, adds 1 to the result, and returns the outcome. Then roll two eight-side dice and return the result. The labels will be attached to each result.)";
			helpText += "\n";
			helpText += "\n_*Mulitple Rolls*_";
			helpText += "\nYou may add (in any order) a parameter of the form `#x` (or `x#`), which will run # multiples of whatever the command is:";
			helpText += "\n`/roll 10x 1d20+1 to hit 1d6 damage`    (Rolls a 1d20+1 and a 1d6 couplet, 10 times in a row)";
			helpText += "\n`/roll x2 1d20-1 to hit 1d12+1 damage`    (Rolls a 1d20-1 and a 1d12+1 couplet, twice in a row)";
      helpText += "\n";
			helpText += "\n_*Macros*_";
			helpText += "\n Per user macros allow you to set a long command once, associate it with a short command phrase, and then reuse the command phrase whenever necessary.";
			helpText += "\n`/roll setmacro $[MACRO-NAME] [full dice command]` - Setup a new macro. `$` is required to identify the macro name at creation.";
			helpText += "\n`/roll getmacro $[MACRO-NAME]` - Return the dice command for a particular macro. `$` is optional.";
			helpText += "\n`/roll getmacro` - Return all currently set macros.";
			helpText += "\n`/roll $[MACRO-NAME]` - Run the named macro. `$` is optional.";
			helpText += "\n`/roll deletemacro $[MACRO-NAME]` - Delete the named macro.";
			helpText += "\n`/roll deleteallmymacros` - Delete all macros currently associated with your username.";
			helpText += "\nYou can set a dice macro with the `setmacro` command. Macro names must be prefixed with `$` at creation, and use alphanumeric characters (no spaces). Whatever follows the macro name will be the command set to that macro:";
			helpText += "\n`/roll setmacro $fists-of-fury 2x 1d20+5 to hit with fists of fury to hit 1d6 damage`";
			helpText += "\n`/roll fists-of-fury`";
			return helpText;
}


//message reception code
function rollMessage(message)
{

  //message.channel.send('message receieved');
    
  var data = message.content;
	
  var helpMatch = data.match(/help/i);
  if(helpMatch != null)
  {
	message.author.send(getHelpText());
	return;
  }
/*
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
