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
	logger("finished processing a /roll message");
  }
  
});

function logger(message)
{
  console.log(message);
}

function getHelpText1()
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
	helpText += "\n\n";		
	return helpText;
}

function getHelpText2()
{
	var helpText = "\n_*Mulitple Rolls*_";
	helpText += "\nYou may add (in any order) a parameter of the form `#x` (or `x#`), which will run # multiples of whatever the command is:";
	helpText += "\n`/roll 10x 1d20+1 to hit 1d6 damage`    (Rolls a 1d20+1 and a 1d6 couplet, 10 times in a row)";
	helpText += "\n`/roll x2 1d20-1 to hit 1d12+1 damage`    (Rolls a 1d20-1 and a 1d12+1 couplet, twice in a row)";
      	helpText += "\n\n";
	return helpText;
}

function getHelpText3()
{
	var helpText = "\n_*Macros*_";
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
	helpText += "\n\n";
	return helpText;
}

function randint(sides) {
	return Math.round(Math.random() * (sides - 1)) + 1;
}

function rolldice(sides, num) 
{
	var results = [];
	for (var j = 1; j <= num; j++) {
		results.push(randint(sides));
	}
	return results;
}

function getRollResults(sides, num) {
	var result = {
		rolls: rolldice(sides, num),
		rollsTotal: 0
	}
	for( var i = 0; i < result.rolls.length ; i++) {
		result.rollsTotal += result.rolls[i];
	}
	return result;
}

function diceBot(name,num,sides,bonusType,bonus,advantage,label) {
	var results = [];
	var isCrit = false;
	var isFail = false;
	var firstResults = getRollResults(sides,num);
	results.push(firstResults);
	var finalResults = firstResults;

	if(advantage.indexOf("dis") != -1) 
	{
		var secondResults = getRollResults(sides,num);
		results.push(secondResults);
		if(firstResults.rollsTotal > secondResults.rollsTotal) {
			finalResults = secondResults;
		} else {
			finalResults = firstResults;
		}
	} 
	else if(advantage.indexOf("adv") != -1) 
	{
		var secondResults = getRollResults(sides,num);
		results.push(secondResults);
		if(firstResults.rollsTotal > secondResults.rollsTotal) {
			finalResults = firstResults;
		} else {
			finalResults = secondResults;
		}
	}

	if(sides == 20 && num == 1) {
		if(finalResults.rollsTotal == 20) {
			isCrit = true;
		} else if(finalResults.rollsTotal == 1) {
			isFail = true;
		}
	}
	// add bonus
	var finalTotal = finalResults.rollsTotal;
	var bonusString = "";
	if(bonusType && (bonusType == "+" || bonusType == "-")) {
		finalTotal = finalTotal + Number(bonusType+bonus);
		bonusString = bonusType+bonus;
	}
	//printing results
	var text = name + " rolled *`" + finalTotal + "`*";

	if(advantage) {
		if(advantage.indexOf("dis") != -1) {
			text += " with disadvantage";
		} else if (advantage.indexOf("adv") != -1) {
			text += " with advantage";
		}
	}

	if(label) {
		text += " for _'"+label+"'_";
	}

	if(isCrit) {
		text += " _`CRITICAL!`_";
	} else if(isFail) {
		text += " `FAIL!`";
	}
	text += "\n";

	var formatResult = function(num, sides, bonusString, result) {
		var m = "_" + num + "d" + sides + bonusString + "_ : ";
		if(result.rolls.length > 1) {
			m += "Results";
			for(var i = 0; i < result.rolls.length; i++) {
				m += " `"+result.rolls[i]+"`"
			}
			m += " " + bonusString;
		} else {
			m += "Result _" + result.rollsTotal + bonusString+"_"
		}
		m += "  Total: _*" + (result.rollsTotal+Number(bonusString)) + "*_\n"

		return m;
	};

	for(var i = 0; i < results.length; i++) {
		text += formatResult(num,sides,bonusString,results[i]);
	}
	//build result data structure
	logger("final result text in diceBot is ["+text+"]");
	var msgData = {
		"results": text,
	  	"critical" : false,
		"fail": false
	};

	if(isCrit) {
		//msgData.attachments.push({"image_url": "http://www.neverdrains.com/criticalhit/images/critical-hit.jpg", "text": "*CRITICAL!*","mrkdwn_in": ["text"]});
		msgData.critical = true;
	}
	if(isFail) {
		//msgData.attachments.push({"image_url": "http://i.imgur.com/eVW7XtF.jpg", "text": "*FAIL!*","mrkdwn_in": ["text"]});
		msgData.fail = true;
	}

	return msgData;
}

function doRoll(realName,text) 
{
	logger("doRoll: text is ["+text+"]");
	var match = text.match(/(\d+)(d)(\d+)(\+|-){0,1}(\d+){0,1}\s{0,1}(disadvantage|advantage|adv\b|dis\b){0,1}\s{0,1}([\s\S]+)?/i);
	logger("doRoll: match is ["+match+"]");
	if(match != null)
	{
		logger("doRoll: match was not null");
		var num = match[1] || 1;
		var sides = match[3] || 6;
		var bonusType = match[4] || "";
		var bonus = match[5] || 0;
		var advantage = match[6] || "";
		var label = match[7] || "";
		var msgData = diceBot(realName,num,sides,bonusType,bonus,advantage,label);
		return msgData;
	}
	logger("doRoll: match was null");
	return null;
}

function processDiceCommandString(realName, diceCommandString)
{
	var text = diceCommandString; //create a copy since we will be modifying this
	var match = text.match(/(\d+)(d)(\d+)/ig);

	if(!match) {
		logger("failed match!");
		return '*No valid dice roll recognized in ['+diceCommandString+']!*\nUse _/roll help_ to get usage.';
	}

	//first, check to see if there's a multiplier anywhere in the string
	var multiplierMatch = text.match(/\s{0,1}(\d+)[x|X]\s/i);
	var multiplier = 1;
	if(multiplierMatch != null)
	{
		logger("Found a multipler match: " +multiplierMatch);
		multiplier = Number(multiplierMatch[1]);
		var indexOfMultipler = text.indexOf(multiplierMatch[1]);
		logger("Found a multipler match; text before: " +text);
		text = text.replace(/(\d+)[x|X]/,"");
		logger("Found a multipler match; text after: " +text);
	}
	else
	{

        	multiplierMatch = text.match(/\s{0,1}[x|X](\d+)\s/i);
		multiplier = 1;
		if(multiplierMatch != null)
		{
			logger("Found a multipler match: " +multiplierMatch);
			multiplier = Number(multiplierMatch[1]);
			var indexOfMultipler = text.indexOf(multiplierMatch[1]);
			logger("Found a multipler match; text before: " +text);
			text = text.replace(/(\d+)[x|X]/,"");
			logger("Found a multipler match; text after: " +text);
		}
		else
		{
          		logger("No multiplier request. Proceed as normal");
        	}
	}

	args = [];
	var match = text.match(/(\d+)(d)(\d+)/ig);
	for (var i = match.length-1 ; i >= 0; i--) 
	{
		var idx = text.lastIndexOf(match[i]);
		arg = text.slice(idx);
		args.push(arg);
		text = text.slice(0,idx);
		logger("arg: "+arg);
		logger("remaining: "+text);
	}

	logger("Building msgDataArray");		
	var msgDataArray = [];
	for(var k = 0; k < multiplier; k++)
	{
		for (var i = args.length-1; i >= 0; i--) 
		{
			logger("Rolling: "+args[i]);
			nextMessage = doRoll(realName,args[i]);
			if(nextMessage != null) 
			{
			  	msgDataArray.push(nextMessage);
			} 
			else 
			{
				var errorMsgData = {
					"results": '*No valid dice roll recognized in ['+diceCommandString+']!*\nUse _/roll help_ to get usage.',
	  				"critical" : false,
					"fail": false
				};
				msgDataArray.push(errorMsgData);
				return msgDataArray;
			}
		}
	}

	return msgDataArray; 
}



//message reception code
function rollMessage(message)
{
  //message.channel.send('message receieved');   
  var data = message.content;
	 var name = message.author.username;
  var helpMatch = data.match(/help/i);
  if(helpMatch != null)
  {
	message.author.send(getHelpText1());
	message.author.send(getHelpText2());
	message.author.send(getHelpText3());
	return;
  }

	//TODO: rolling for maddness in D&D 5e
	/*
      var madnessMatch = data.text.match(/madness/i);
      if(madnessMatch != null)
      {
        robot.logger.debug("Recieved madness request.");
        var msgData = getInteractiveMadnessMsg(channel_name);
        robot.logger.debug("msgData is:\n" + JSON.stringify(msgData));
        return res.json(msgData);
      }
      */
	
	//TODO macros
	/*
			var macroMatch = data.text.match(/(deleteallmymacros|deletemacro|clearallmacros|getmacro|setmacro|\$)/i);
			//var macroMatch = data.text.match(new RegExp('clearallmacros\|getmacro\|setmacro\|'+MACRO_CHAR,"i"));
			var diceMatch = data.text.match(/(\d+)(d)(\d+)/ig);
			if(macroMatch != null)
			{
				var msgData = processMacroCommand(data.text,realName,username,channel_name);
				return res.json(msgData);
			}
	*/
	
			//else if(diceMatch != null)
	var diceMatch = data.match(/(\d+)(d)(\d+)/ig);
	if(diceMatch != null)
	{
		logger("rolling dice...");
		var msgDataArray = processDiceCommandString(name,data);
		//logger("msgData is:\n" + msgData);
		//TODO: the data needs to arrive in a foemat neutral package. we should send it tona different function for formatting
        	message.channel.send(msgDataArray[0].results);
		return;
	}
	else
	{
		//TODO macros
		/*
		//no explicit macro command, and no dice roll command.
		//check if it's a macro request without the #
		macroMatch = data.text.match(/([\S]+)/i);
		if(macroMatch == null)
		{
			message.channel.send("No valid dice roll or macro command. Use _/roll help_ to see command options.");
			return;
		}
		var msgData = processMacroCommand(data.text,realName,username,channel_name);
		return res.json(msgData);
		*/
		message.channel.send("3No valid dice roll or macro command. Use _/roll help_ to see command options.");
		return;
	}
}

client.login(process.env.BOT_TOKEN);
