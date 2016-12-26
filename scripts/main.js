var sceneCourante = "";

require(["scene"],function(scene){
	ouvrirScene("Place Marchande","place.json")
})
/*
require(["dialogue"],function(){
  ouvrirDialogue("Boulanger","boulanger.json");
});*/

function loadPnj(nom, fichier){
	require(["dialogue","scene"],function(dialogue,scene){
		reduireScene();
	  	ouvrirDialogue(nom,fichier);
	});
}