var sceneCourante = "";
var testouille = "tg clement";
var tabPnj = [];
var tabScene = []; //tab des scenes ouvertes

var Personnage = function(nom,inventaire,etat,contradiction){
	this.nom = nom;
	this.inventaire = inventaire;
	this.etat = etat;
};
/*
require(["scene"],function(scene){
	ouvrirScene("Place Marchande","place.json")
})

require(["dialogue"],function(){
  ouvrirDialogue("Boulanger","boulanger.json");
});*/

require(["menuChoix"],function(menu){
	ouvrirMenu();
})


function loadPnj(nom, fichier){

	if (pnjPresent(nom)==-1){
		tabPnj.push(new Personnage(nom,"",0,""));
		sauvegardePresente = false;
	} else {
		sauvegardePresente = true;
	}
	require(["dialogue","scene"],function(dialogue,scene){
		reduireScene();
	  	ouvrirDialogue(nom,fichier,sauvegardePresente);
	});
}

function loadScene(nom,fichier){
	
	require(["menuChoix","scene"],function(menu,scene){
		reduireMenu();
	  	ouvrirScene(nom,fichier);
	});
}

function afficherMenu(){
	require(["menuChoix"],function(menu){
		retourMenu();
	})
}

function afficherScene(){
	require(["scene"],function(scene){
		retourScene();
	})
}

function pnjPresent(obj) {
    var i;
    for (i = 0; i < tabPnj.length; i++) {
        if (tabPnj[i].nom !== undefined && tabPnj[i].nom === obj) {
            return i;
        }
    }

    return -1;
}

function scenePresente(obj) {
    var i;
    for (i = 0; i < tabScene.length; i++) {
        if (tabScene[i] !== undefined && tabScene[i] === obj) {
            return i;
        }
    }

    return -1;
}

//tabPnj.push(new Personnage("bouh","",0));

