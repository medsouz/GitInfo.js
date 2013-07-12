//GitInfo.js
var sys = require("sys");
var exec = require("child_process").exec;

function arrayContains(array, item){
	for(var x = 0; x < array.length; x++){	
		if(array[x] == item){
			return true;
		}
	}
	return false;
}

exports.NAME = 0;
exports.EMAIL = 1;
exports.NAME_AND_EMAIL = 2;


//Get an array of all the contributors
//GitInfo.getContributors(function(array){},type);
//Available types: GitInfo.NAME = nickname, GitInfo.EMAIL = email, GitInfo.NAME_AND_EMAIL = name|email
//Default: NAME
exports.getContributors = function(callback, type){
	var format = "%an";
	switch(type){
		case 0:
			format = "%an";
			break;
		case 1:
			format = "%ae";
			break;
		case 2:
			format = "%an|%ae";
			break;
	}
	exec("git log --pretty=format:\""+format+"\"", function(err,stdout,stderr){
		var lines = stdout.split("\n");
		var contributors = new Array();
		for(var num = 0; num < lines.length; num++){
			var entry = lines[num].toString();
			if(!arrayContains(contributors, entry)){
				contributors[contributors.length] = entry;
			}
		}
		callback(contributors);
	});
}

//Get the latest commit HEAD
//GitInfo.getHEAD(function(HEAD){});
exports.getHEAD = function(callback){
	exec("git log --pretty=format:\"%h\"", function(err,stdout,stderr){
		callback(stdout.split("\n")[0]);
	});
}
