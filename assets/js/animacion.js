

var anima = function(){

	this.leftToRigth = function(id){
	document.getElementById(id).style.transition = ".2s ease-in-out";
	document.getElementById(id).style.left = "0px";
	}
	this.rigthToLeft = function(id){
		document.getElementById(id).style.transition = ".2s ease-in-out";
		document.getElementById(id).style.left = "-42%";
	}

}