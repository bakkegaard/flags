Array.prototype.copy= function(){
	var arr= [];	
	for(var i=0;i<this.length;i++){
		arr.push(this[i]);	
	}
	return arr;
}
Array.prototype.shuffle= function(factor){
	var arr= this.copy();
	var length= this.length;
	getRand= function(){
		return (Math.floor(Math.random()*Math.pow(2,32))) % length;
	}
	for(var i=0;i<this.length*factor;i++){
		var i= getRand();
		var j= getRand();

		var temp= arr[i];
		arr[i]=arr[j];
		arr[j]=temp;
	}
	return arr;

}

var flags=[
	['Afghanistan','kabul','http://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg'],
	['Albanien','Tirana','http://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg'],
	['Algeriet','Algier','http://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg'],
	['Andorra','Andorra la Vella','https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg'],
	['Angola','Luanda','https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg']
];
	var current=0;
	var score=0;
	var streak=0;
	var first=true;
	var random_flags;
$(function(){
	random_flags= flags.shuffle(1);
	next();
	$("input").keyup(function(event){
		if(event.keyCode == 13){
			guess();
		}
	});
});



function reset(){
	current=0;
	score=0;
	streak=0;
	first=true;
	random_flags= flags.shuffle(1);
}

function next(){
	if(!first) current++;
	first=false;
	
	if(current==random_flags.length){
		reset();
	}
	$('#land').val('');
	$('#capital').val('');
	$('#info').empty();
	$('#info').append('Score: '+score+', streak: '+streak+'<br>');
	$('#pic').attr("src",random_flags[current][2]);
}

function guess(){
	var land_guess= $('#land').val().toLowerCase().trim();
	var capital_guess= $('#capital').val().toLowerCase().trim();

	var land_correct = random_flags[current][0];
	var capital_correct= random_flags[current][1];

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
