
var calculette;

window.onload = function () {
    //On récupère les différents éléments du DOM
    calculette = new Calculette();
    calculette.formuleScreen = document.getElementById("formule");
    calculette.screen = document.getElementById("screen").children[0];
    calculette.resultScreen = document.getElementById("result");
    console.log("Loaded");
    calculette.refreshScreens();
};

class Calculette {
    constructor(resultScreen, formuleScreen, screen) {
        this.resultScreen = resultScreen;
        this.formuleScreen = formuleScreen;
        this.screen = screen;
        this.formule = [""]; //Liste contenant les opérateurs et opérandes
        this.cancel_list = [];
    }

    //Fonction qui met à jour l'affichage
    refreshScreens() {

        let resScreen = ""; //Expression à affiché
        this.formule.forEach((val) => {
            // Pour chaque opérateur/opérande
            if (val === parseInt(val, 10) || val == ".") {
                //Affichage si val est un chiffre ou "."
                resScreen = resScreen + val;
            } else {
                //affichage pour certain opérateur spéciaux
                switch (val) {
                    case "/":
                        resScreen = resScreen + " ÷ ";
                        break;

                    case "*":
                        resScreen = resScreen + " x ";
                        break;

                    case "(":
                        resScreen = resScreen + " (";
                        break;

                    case ")":
                        resScreen = resScreen + ") ";
                        break;

                    default:
                        resScreen = resScreen + " " + val + " ";
                        break;
                }
            }
        });
        this.screen.innerHTML = resScreen; // on affiche l'expression sur l'écrand
    }

    //Fonction qui enlève un symbole
    RemoveSymbole() {
        this.cancel_list.push(this.formule.slice()); //Copie de l'array
        this.formule.pop();
        this.refreshScreens();
    }

    //Fonction qui rajoute un symbole
    AddSymbole(symb) {
        this.cancel_list.push(this.formule.slice()); //Copie de l'array
        this.formule.push(symb);
        this.refreshScreens();
    }

    //Fonction qui annule la dernière action effectue
    Cancel() {
        if (this.cancel_list.length > 0) { //Si des actions ont été faites
            this.formuleScreen.innerHTML = "";
            this.resultScreen.innerHTML = "";
            this.formule = this.cancel_list.pop();
            this.refreshScreens();
        }
    }

    //Fonction qui calcule la formule
    calculate() {
        this.cancel_list.push(this.formule.slice());
        this.formuleScreen.innerHTML = this.screen.innerHTML; //On écrit la formule en haut a gauche de la calculette
        let expression = ""; //On initialise l'expression
        this.formule.forEach((val) => {
            expression = expression + val; //on ajoute chaque opérateur/opérande dans l'expression
        });

        try {
            this.resultScreen.innerHTML = eval(expression);
        } catch (err) {
            // On essaye d'afficher le résultat
            //Si une erreur survient
            this.resultScreen.innerHTML = "ERREUR"; //On affiche ERREUR à la place du résultat
        }
    }
}
