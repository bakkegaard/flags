"use strict";
/*
 * TODO:
 */
var flags=[
	['Afghanistan','kabul','http://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg'],
	['Albanien','Tirana','http://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg'],
	['Algeriet','Algier','http://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg'],
	['Andorra','Andorra la Vella','https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg'],
	['Angola','Luanda','https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg'],
	['Antigua og Barbuda','Saint John\'s','https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg'],
	['Argentina','Buenos Aires','https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'],
	['Armenien','Jerevan','https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg'],
	['Aserbajdsjan','Baku','https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg'],
	['Australien','Canberra','https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg'],
	['Bahamas','Nassau','https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg'],
	['Bahrain','Manama','http://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg'],
	['Bangladesh','Dhaka','https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg'],
	['Barbados','Bridgetown','https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg'],
	['Belgien','Bruxelles','https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg'],
	['Belize','Belmopan','https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg'],
	['Benin','Porto-Novo','https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg'],
	['Bhutan','Thimphu','https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg'],
	['Bolivia','Sucre','https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg'],
	['Bosnien og Hercegovina','Sarajevo','https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg'],
	['Botswana','Gaborone','https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg'],
	['Brasilien','Brasilia','https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg'],
	['Brunei','Bandar Seri Begawan','https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg'],
	['Bulgarien','Sofia','https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg'],
	['Burkina Faso','Ouagadougou','https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg'],
	['Burundi','Bujumbura','https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'],
	['Cambodja','Phnom Penh','https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg'],
	['Cameroun','Yaoundé','https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg'],
	['Canada','Ottawa','https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg'],
	['Centralafrika','Bangui','https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg'],
	['Chile','Santiago','https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg'],
	['Colombia','Bogotá','https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg']
];


Array.prototype.clone= function(){
	return this.slice(0);
}

Array.prototype.delete= function(index){
	this.splice(index,1);	
}

var current=0,
	mistakes=0,
	streak=0,
	first=true,
	random_flags,
	current_flags;



function getRandom(i){
		return (Math.floor(Math.random()*Math.pow(2,32))) % i;
}

function setLatest10(){
	current_flags= flags.clone().splice(flags.length-10);
	reset();
}
function setAll(){
	current_flags=flags.clone();
	reset();
}

function end(){
	alert('You did it! \n '+current_flags.length+' flags, and you had '+mistakes+' mistakes. \n Play Again?');
	reset();
}

function reset(){
	current=0;
	mistakes=0;
	streak=0;
	first=true;
	random_flags= current_flags.clone();
	next();
}


function next(){

	current= getRandom(random_flags.length);
	
	if(random_flags.length==0){
		end();
	}
	document.getElementById('land').value='';
	document.getElementById('capital').value='';
	document.getElementById('info').innerHTML='';
	document.getElementById('info').innerHTML= 'Mistakes: '+mistakes+', streak: '+streak+'<br>';
	document.getElementById('pic').setAttribute("src",random_flags[current][2]);
	document.getElementById('land').focus();
}

function guess(){
	var land_guess= document.getElementById('land').value.toLowerCase().trim();
	var capital_guess= document.getElementById('capital').value.toLowerCase().trim();

	var land_correct = random_flags[current][0];
	var capital_correct= random_flags[current][1];

	var land_ok= (land_guess===land_correct.toLowerCase());
	var capital_ok=(capital_guess===capital_correct.toLowerCase());

	if(land_ok && capital_ok){
		random_flags.delete(current);
		streak++;
	}
	else{
		var response= "WRONG!\n";
		if(!land_ok){
			response+="Land is "+land_correct+"\n";
		}
		if(!capital_ok){
			response+="Capital is "+capital_correct;	
		}
		streak=0;
		mistakes++;
		alert(response);
	}
	next();
}
