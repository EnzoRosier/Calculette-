let formule = []; //Liste contenant les opérateurs et opérandes

window.onload = function () {
    //On récupère les différents éléments du DOM
    resultScreen = document.getElementById("result");
    formuleScreen = document.getElementById("formule");
    screen = document.getElementById("screen").children[0];

    //On rajoute des évènements sur chacun des boutons
    document.getElementById("but0").onclick = function () { AddSymbole(0); };
    document.getElementById("but1").onclick = function () { AddSymbole(1); };
    document.getElementById("but2").onclick = function () { AddSymbole(2); };
    document.getElementById("but3").onclick = function () { AddSymbole(3); };
    document.getElementById("but4").onclick = function () { AddSymbole(4); };
    document.getElementById("but5").onclick = function () { AddSymbole(5); };
    document.getElementById("but6").onclick = function () { AddSymbole(6); };
    document.getElementById("but7").onclick = function () { AddSymbole(7); };
    document.getElementById("but8").onclick = function () { AddSymbole(8); };
    document.getElementById("but9").onclick = function () { AddSymbole(9); };
    document.getElementById("butcomma").onclick = function () { AddSymbole("."); };
    document.getElementById("butplus").onclick = function () { AddSymbole("+"); };
    document.getElementById("but-").onclick = function () { AddSymbole("-"); };
    document.getElementById("butx").onclick = function () { AddSymbole("*"); };
    document.getElementById("butdivide").onclick = function () { AddSymbole("/"); };
    document.getElementById("butC").onclick = function () { RemoveSymbole(); };
    document.getElementById("butopenP").onclick = function () { AddSymbole("("); };
    document.getElementById("butcloseP").onclick = function () { AddSymbole(")"); };
    document.getElementById("butequal").onclick = function () { calculate(); };
    console.log("Loaded")
    refreshScreens()
};

//Fonction qui enlève un symbole
function RemoveSymbole() {
    formule.pop();
    refreshScreens();
}

//Fonction qui rajoute un symbole
function AddSymbole(symb) {
    formule.push(symb)
    refreshScreens()
}

//Fonction qui calcule la formule
function calculate() {
    formuleScreen.innerHTML = screen.innerHTML; //On écrit la formule en haut a gauche de la calculette
    expression = "" //On initialise l'expression
    formule.forEach(val => {
        expression = expression + val; //on ajoute chaque opérateur/opérande dans l'expression
    });

    try { resultScreen.innerHTML = eval(expression) }// On essaye d'afficher le résultat
    catch (err) { //Si une erreur survient
        resultScreen.innerHTML = "ERREUR"; //On affiche ERREUR à la place du résultat
    }
}

//Fonction qui met à jour l'affichage
function refreshScreens() {
    resScreen = ""; //Expression à affiché
    formule.forEach(val => { // Pour chaque opérateur/opérande
        if (val === parseInt(val, 10) || val == ".") { //Affichage si val est un chiffre ou "."
            resScreen = resScreen + val;
        } else { //affichage pour certain opérateur spéciaux
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
    screen.innerHTML = resScreen; // on affiche l'expression sur l'écrand
}

