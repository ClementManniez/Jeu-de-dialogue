var dossierScene = "json/scene/";
var scene = "";
var sceneCourante ="";

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                scene = rawFile.responseText;
		scene = JSON.parse(scene);
            }
        }
    }
	
    rawFile.send(null);
}

function init(fichier){
	var chemin  = dossierScene + fichier;
	readTextFile(chemin);

}

function ouvrirScene(nom,fichier){
	init(fichier);
	this.sceneCourante = "scene" + nom; //id de la scène

	var strVar="";
	strVar += "		<div class = \"scene\" id=\"scene"+nom+"\">";
	strVar += "			<div class = \"bandeau\" >";
	strVar += "				<h3 id=\"etatbandeau\">"+nom+"<span onclick =\"fermerScene(sceneCourante)\">      [X]<\/span><\/h3>";
	strVar += "				";	
	strVar += "			<\/div>";
	strVar += "			<div id =\"listePnj\" >";
	strVar += "				";
	strVar += "			<\/div>		";
	strVar += "";
	strVar += "		<\/div>";

	document.body.innerHTML = document.body.innerHTML + strVar;
	
	zonePnj = document.getElementById("listePnj");

	for (i=0; i< scene.listePnj.length; i++){
		var str = "<div class=\"pnj\" onclick='loadPnj(\""+scene.listePnj[i].nom+"\",\""+scene.listePnj[i].fichier+"\")'>"+scene.listePnj[i].nom+" <\/div>";

		zonePnj.innerHTML = zonePnj.innerHTML + str;
	} 
}

function reduireScene(){
	document.getElementById(sceneCourante).style.visibility = "collapse";
}

function retourScene(){
	document.getElementById(sceneCourante).style.visibility = "visible"
}

function fermerScene(nom){
	var aSuppr = document.getElementById(nom);
	/*
	aSuppr.innerHTML = "";
	aSuppr.style.visibility = "collapse";
	*/
	aSuppr.parentNode.removeChild(aSuppr);
	afficherMenu();

	

}
