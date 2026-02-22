const select = document.getElementById("brainrotSelect");
const levelInput = document.getElementById("levelInput");
const resultSpan = document.getElementById("result");
const lvlMultSpan = document.getElementById("lvlMult");
const mutMultSpan = document.getElementById("mutMult");
const formulaText = document.getElementById("formulaText");

// REMPLISSAGE DE LA LISTE (Respecte l'ordre de brainrots.js)
function init() {
    if (typeof brainrots === 'undefined') return;

    select.innerHTML = "";
    Object.keys(brainrots).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });

    calculate();
}

// CALCUL AVEC FORMULE ADDITIVE
function calculate() {
    const selectedName = select.value;
    let level = parseInt(levelInput.value) || 1;

    if (!selectedName || !brainrots[selectedName]) return;

    const baseValue = brainrots[selectedName].base;
    
    // Level Multiplier: +33% par niveau (lvl 1 = 1.00x)
    let levelMult = 1 + (0.33 * (level - 1));
    
    // Mutation Multiplier: Formule additive (Ex: 2.5 + 2.5 = 1 + 1.5 + 1.5 = 4.0x)
    let mutationBonus = 0;
    document.querySelectorAll(".mutation-check").forEach(box => {
        if (box.checked) {
            mutationBonus += (parseFloat(box.value) - 1);
        }
    });

    let finalMutationMult = 1 + mutationBonus;

    // Résultat
    const finalResult = baseValue * levelMult * finalMutationMult;

    resultSpan.textContent = Math.round(finalResult).toLocaleString('en-US');
    lvlMultSpan.textContent = levelMult.toFixed(2) + "x";
    mutMultSpan.textContent = finalMutationMult.toFixed(1) + "x";
    formulaText.textContent = `(${baseValue} × ${levelMult.toFixed(2)} × ${finalMutationMult.toFixed(1)})`;
}

function resetAll() {
    levelInput.value = 1;
    document.querySelectorAll(".mutation-check").forEach(b => b.checked = false);
    calculate();
}

function copyResult() {
    navigator.clipboard.writeText(resultSpan.textContent);
    alert("Copié !");
}

// On lance quand la page est chargée
window.onload = init;
