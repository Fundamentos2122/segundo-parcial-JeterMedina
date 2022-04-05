const formRecetas = document.getElementById("form-recipe");
const recetas = document.getElementById("view");

const keyList2 = "recetas";

document.addEventListener("DOMContentLoaded", function() {
    formRecetas.addEventListener("submit", submitRecipe);
});

function submitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();


    let receta = {
        text: formRecetas["title"].value,
        img: formRecetas["img_url"].value
    };


    let list = getRecipe();

    list.push(receta);

    console.log(list);

    localStorage.setItem(keyList, JSON.stringify(list));

    paintReceta();
}

function paintReceta() {
    let list = getRecipe();

    let html = '';

    for(var i = 0; i < list.length; i++) {
        html += 
            `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>
            <div class="[ row ] [ flex ]" data-state="wrap">
                <div class="[ col ]">
                    <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${i.id}">
                        <img src="${list[i].img_url}" alt="">
                        <div class="[ flow ]">
                            <h5>$${list[i].text}</h5>
                            <div class="[ flex ]" data-state="justify-between">
                                <button class="[ btn ]" data-state="white" onclick="getRecipe(${i.id})">Ver</button>
                                <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${i.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `;
    }

    recetas.innerHTML = html;

    console.log(recetas);

    console.log(list);
}

function getRecipe() {
    let list = JSON.parse(localStorage.getItem(keyList2));

    if (list === null) {
        return [];
    }
    else {
        return list;
    }
}

function deleteRecipe(id) {
    let list = getRecipe();

    list = list.filter(i => i.id !== id);

    localStorage.setItem(keyList2, JSON.stringify(list));

    let receta = document.getElementById(id);

    receta.className += ' hide';

    setTimeout(() => {
        receta.remove();
    }, 300);
}

//Ingredientes
const divIngrediente = document.getElementById("newIng");
const ingrediente = document.getElementById("ingredient-temp-list");

const keyList = "ingrediente";

document.addEventListener("DOMContentLoaded", function() {
    divIngrediente.addEventListener("submit", submitIng);
});

function submitIng(e) {
    e.preventDefault();
    e.stopPropagation();

    let ingrediente = {
        text: divIngrediente["ingredient-name"].value
    };

    let list = getIngredientes();

    list.push(ingrediente);

    localStorage.setItem(keyList, JSON.stringify(list));

    paintIngrediente();
}

function obtieneIngrediente() {
    let list = JSON.parse(localStorage.getItem(keyList));

    if (list === null) {
        return;
    }
    else {
        return list;
    }
}

function paintIngrediente() {
    let list = obtieneIngrediente();

    let html = '';

    for(var i = 0; i < list.length; i++) {
        html += 
            `<li class="[ bg-white color-gray ]"> ${list[i].text}
            <button class="close" type="button" >X</button>
            </li>`;

            // <div class="card" id="${list[i].id}">
            //     <div class="card-img">
            //         <img src="https:\\picsum.photos/600" alt="">
            //     </div>
            //     <div class="card-text">
            //         ${list[i].text}
            //     </div>
            //     <button class="close" onclick="deleteTweet(${list[i].id})">X</button>
            // </div>
    }

    ingrediente.innerHTML = html;
}