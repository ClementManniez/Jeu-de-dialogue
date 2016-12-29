
var dossierJson = "json/pnj/";
var replique = "";
var dialogueCourant = "";

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
                replique = rawFile.responseText;
		replique = JSON.parse(replique);
            }
        }
    }
	
    rawFile.send(null);
}



//=============fonctions pour le drop========================
function dejaPresente(id){
	if (document.getElementById(id)===null){
		return true;
	}else{
		return false;
	}
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("div", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("div");
    if (ev.target.className == "droppable"){
	    //ev.target.appendChild(document.getElementById(data));
	    var nodeCopy = document.getElementById(data).cloneNode(true);
	  	nodeCopy.id = "copieReplique"+nodeCopy.id; /* We cannot use the same ID */
	  	if (dejaPresente(nodeCopy.id)){
	  		ev.target.appendChild(nodeCopy);
	  	}
  	}
  	
  	
}


//===========================================================
var repliqueCourante = 0;
var etat = 0;
var etatJson = 'e'.concat(etat);

function delaiReponse(){
	var element = document.getElementById("typing");
	element.parentNode.removeChild(element);

	loadReplique(repliqueCourante);
	loadChoix(repliqueCourante);


}

function msgJoueur(msg){
	zoneMsg = document.getElementById("messages");
	zoneMsg.innerHTML = zoneMsg.innerHTML + " <div class = \"bulleDroite\">"+msg+"</div>";

}

function msgPnj(msg){
	zoneMsg = document.getElementById("messages");
	zoneMsg.innerHTML = zoneMsg.innerHTML + " <div class = \"bulleGauche\" draggable=\"true\" ondragstart=\"drag(event)\" id=\"replique"+repliqueCourante+"\">"+msg+"</div>";

}

function etatbandeau(etat){
	zoneMsg = document.getElementById("etatbandeau");
	zoneMsg.innerHTML = zoneMsg.innerHTML + etat;
}

function loadChoix(repliqueId){

	document.getElementById("choix1").innerHTML = replique.Repliques[repliqueId].listechoix[0].choix;

	document.getElementById("choix2").innerHTML = replique.Repliques[repliqueId].listechoix[1].choix;

	document.getElementById("newetat").innerHTML = "Enerver le boulanger";
}

function loadReplique(repliqueId){

	if (this.etat == 1) showStuff("newetat");
	msgPnj(replique.Repliques[repliqueId].texte);
}

function changeEtat(newetat){
	this.etat = newetat;
	this.etatJson = 'e'.concat(newetat);
	alert("Vous avez énervé le boulanger !");
	showStuff("newetat");
	etatbandeau("(énervé)");
}


function reponse(idBouton){
	//chargement msg joueur
	msgJoueur(replique.Repliques[repliqueCourante].listechoix[idBouton].choix);

	//chargement réplique suivante
	
	//var etatJson = "e".concat(etat);

	//Vérification : l'état actuel est il dans la liste d'etat qui influence les successeurs de cette réplique
	if (replique.Repliques[repliqueCourante].listechoix[idBouton].etat[0][etatJson]!== undefined){
		//si oui changement de l'etat
		if(replique.Repliques[repliqueCourante].listechoix[idBouton].etat[0][etatJson][1] !== undefined){
			this.etat = replique.Repliques[repliqueCourante].listechoix[idBouton].etat[0][etatJson][1];
		}

		repliqueCourante = replique.Repliques[repliqueCourante].listechoix[idBouton].etat[0][etatJson][0] ;
	}else{
	//même chose avec le successeur par défaut
		if(replique.Repliques[repliqueCourante].listechoix[idBouton].successeur[1] !== undefined){
				this.etat = replique.Repliques[repliqueCourante].listechoix[idBouton].successeur[1];
			}

		repliqueCourante = replique.Repliques[repliqueCourante].listechoix[idBouton].successeur[0];
	} 

	zoneMsg = document.getElementById("messages");
	zoneMsg.innerHTML = zoneMsg.innerHTML + " <div  draggable=\"true\" ondragstart=\"drag(event)\" id=\"typing\"><img src=\"typing.gif\" height=\"42\" ></img></div>";

	if (repliqueCourante==="x"){
		fermerDialogue(dialogueCourant);
		afficherScene();
	}else{
		setTimeout(delaiReponse, 2000);
	}

}
//Détermine le successeur du premier message, en fonction de l'état
function premierMessage(){
	//Vérification : l'état actuel est il dans la liste d'etat qui influence les successeurs de cette réplique
	if (replique.Repliques[0].listechoix[0].etat[0][etatJson]!== undefined){
		//si oui changement de l'etat
		if(replique.Repliques[0].listechoix[0].etat[0][etatJson][1] !== undefined){
			this.etat = replique.Repliques[0].listechoix[0].etat[0][etatJson][1];
		}
		repliqueCourante = replique.Repliques[0].listechoix[0].etat[0][etatJson][0] ;
	}else{
	//même chose avec le successeur par défaut
		if(replique.Repliques[0].listechoix[0].successeur[1] !== undefined){
				this.etat = replique.Repliques[0].listechoix[0].successeur[1];
			}

		repliqueCourante = replique.Repliques[0].listechoix[0].successeur[0];
	} 
}

function showStuff(id) {
    document.getElementById(id).style.display = 'none';
}


function init(fichier){
	var chemin  = dossierJson + fichier;
	readTextFile(chemin);
	premierMessage();
	loadReplique(repliqueCourante);
	loadChoix(repliqueCourante);
}


function test(){
	echo("toto");
}

function ouvrirDialogue(nom,fichier){
	dialogueCourant = "dialogue" + nom ;
	//ajout de la fenetre de dialogue
	var strVar="";
		strVar += "		<div class=\"fenetre\" id = \"dialogue"+nom+"\">";
		strVar += "			<div class = \"bandeau\" >";
		strVar += "				<h3 id=\"etatbandeau\">"+ nom +" <\/h3>";
		strVar += "			<\/div>";
		strVar += "			<div id =\"messages\" ondragover=\"allowDrop(event)\">";
		strVar += "				";
		strVar += "			<\/div>";
		strVar += "";
		strVar += "			<div id=\"reponse\">";
		strVar += "				<div>";
		strVar += "					<button onclick=\"reponse(0)\" id=\"choix1\"><\/button>";
		strVar += "					<button onclick=\"reponse(1)\" id=\"choix2\"><\/button>";
		strVar += "					<button onclick=\"changeEtat(1)\" id=\"newetat\"><\/button>";
		strVar += "				<\/div>";
		strVar += "			<\/div>";
		strVar += "";
		strVar += "		<\/div>";

	divDialogue = document.getElementById("divDialogue");
	divDialogue.innerHTML = divDialogue.innerHTML + strVar;

	//affichage de du div
	divDialogue.style.visibility = "visible";

	//ajout de l'inventaire
	var strInv="";
		strInv += "		<div id=\"inventaire\" class = \"droppable\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">";
		strInv += "			Inventaire : ";
		strInv += "		<\/div>";

	divDialogue.innerHTML = divDialogue.innerHTML + strInv;

	init(fichier);
}

function fermerDialogue(id){
	var dialogue = document.getElementById("divDialogue");
	//dialogue.parentNode.removeChild(dialogue);
	dialogue.innerHTML = "";
	dialogue.style.visibility = "collapse";
}