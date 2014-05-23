Array.prototype.shuffle= function(factor){
	console.log('todo');
	//var n= this.length;
	//for(var i=0;i<n*factor;i++){
		//Math.random();
	//}
}
var flags=[
	['Afghanistan','kabul','http://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg'],
	['Albanien','Tirana','http://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg'],
	['Algeriet','Algier','http://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg']
];
	var current=0;
	var score=0;
	var streak=0;
	var first=true;
$(function(){
	flags.shuffle(1);
	next();
});

function reset(){
	current=0;
	score=0;
	streak=0;
	first=true;
	flags.shuffle(1);
}

function next(){
	if(!first) current++;
	first=false;
	
	if(current==flags.length){
		reset();
	}
	$('#land').val('');
	$('#capital').val('');
	$('#info').empty();
	$('#info').append('Score: '+score+', streak: '+streak+'<br>');
	$('#pic').attr("src",flags[current][2]);
}

function guess(){
	var land_guess= $('#land').val().toLowerCase().trim();
	var capital_guess= $('#capital').val().toLowerCase().trim();

	var land_correct = flags[current][0];
	var capital_correct= flags[current][1];

	var land_ok= (land_guess===land_correct.toLowerCase());
	var capital_ok=(capital_guess===capital_correct.toLowerCase());

	var response;
	if(land_ok && capital_ok){
		response="You are Correct!";
		score++;
		streak++;
	}
	else{
		if(land_ok){
			response="Land is correct, capital is not...";
		}
		else if(capital_ok){
			response="Capital is correct, land is not...";	
		}
		else{
			response= "It's all just wrong..."
		}
		streak=0;
	}
	$('#info').append(response)
		.append('<br> Land: '+land_correct)
		.append('<br> Capital: '+capital_correct);
	
	setTimeout(function(){next()},2000);
}
