var dossierScene = "json/scene/";
var jsonListeScene = "listeScene.json";
var listeScene = "";

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
                listeScene = rawFile.responseText;
		listeScene = JSON.parse(listeScene);
            }
        }
    }
	
    rawFile.send(null);
}

function init(){
	var chemin  = dossierScene + jsonListeScene;
	readTextFile(chemin);

}

function ouvrirMenu(){
	init();

	var strVar="";
	strVar += "		<div id=\"menu\">";
	strVar += "			<div class = \"bandeau\" >";
	strVar += "				<h3 id=\"etatbandeau\">Liste des scènes<\/h3>";
	strVar += "			<\/div>";
	strVar += "			<div id =\"listeScene\" >";
	strVar += "				";
	strVar += "			<\/div>		";
	strVar += "";
	strVar += "		<\/div>";

	document.body.innerHTML = document.body.innerHTML + strVar;
	
	zonePnj = document.getElementById("listeScene");

	for (i=0; i< listeScene.liste.length; i++){
		var str = "<div class=\"pnj\" onclick='loadScene(\""+listeScene.liste[i].nom+"\",\""+listeScene.liste[i].fichier+"\")'>"+listeScene.liste[i].nom+" <\/div>";

		zonePnj.innerHTML = zonePnj.innerHTML + str;
	} 
}


function reduireMenu(){
	document.getElementById("menu").style.visibility = "collapse";
}

function retourMenu(){
	document.getElementById("menu").style.visibility = "visible"
}