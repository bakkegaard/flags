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
	['Bosnien og Hercegovina','Sarajevo','https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg']
];

window.onload=function(){
	random_flags= flags.clone();
	next();
	var inputs= document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		inputs[i].addEventListener("keydown",function(e){
			if(e.keyCode==13) guess();
		},
		false)
	}
};

Array.prototype.clone= function(){
	return this.slice(0);
}

Array.prototype.delete= function(index){
	this.splice(index,1);	
}

var current=0;
var mistakes=0;
var streak=0;
var first=true;
var random_flags;

function getRandom(i){
		return (Math.floor(Math.random()*Math.pow(2,32))) % i;
}

function reset(){
	alert('You did it! \n '+flags.length+' flags, and you had '+mistakes+' mistakes. \n Play Again?');
	current=0;
	mistakes=0;
	streak=0;
	first=true;
	random_flags= flags.clone();
}

function next(){

	current= getRandom(random_flags.length);
	
	if(random_flags.length==0){
		reset();
	}
	$('#land').val('');
	$('#capital').val('');
	$('#info').empty();
	$('#info').append('Mistakes: '+mistakes+', streak: '+streak+'<br>');
	$('#pic').attr("src",random_flags[current][2]);
	$('#land').focus();
}

function guess(){
	var land_guess= $('#land').val().toLowerCase().trim();
	var capital_guess= $('#capital').val().toLowerCase().trim();

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
