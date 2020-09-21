const header = document.querySelector('header');
const links = document.querySelectorAll('.link')

window.addEventListener('scroll', ()=>{
        header.classList.toggle('change',window.scrollY > 1);
        for(i=0; i<links.length; i++){
            links[i].classList.toggle('diff', window.scrollY>1);
        }
});

const searchTerm = document.querySelector('.search');
const searchBtn = document.querySelector('.searchImg');
const mealsEl = document.getElementById("meals");
const searchRecipeTxt = document.getElementById('noti');
const dark = document.querySelector('.darkMode');
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

async function getMealsBySearch(term) {
        const resp = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
        );
    
        const respData = await resp.json();
        const meals = respData.meals;
    
        return meals;
    }

const save = document.querySelector('.save');

function addMeal(mealData) {
        console.log(mealData);
    
        const meal = document.createElement("div");
        meal.classList.add("meal");
    
        meal.innerHTML = `
        <figure class="imghvr-slide-up">
            <img src="${mealData.strMealThumb}">
            <figcaption>
                <h2 class="hover-content">${mealData.strMeal}</h2>
            </figcaption>
        </figure>
        `
        mealsEl.appendChild(meal)

        meal.addEventListener("click", () => {
            showMealInfo(mealData);
        });
        
};

searchTerm.addEventListener('keydown', async (e) =>{
    if(e.keyCode === 13){
        searchRecipeTxt.classList.add('noti')

            mealsEl.innerHTML = "";
        
            const search = searchTerm.value;
            const meals = await getMealsBySearch(search);
        
            if (meals) {
                meals.forEach((meal) => {
                    addMeal(meal);
                });
        }
    }
});

searchBtn.addEventListener("click", async () => {
            searchRecipeTxt.classList.add('noti')

            mealsEl.innerHTML = "";
        
            const search = searchTerm.value;
            const meals = await getMealsBySearch(search);
        
            if (meals) {
                meals.forEach((meal) => {
                    addMeal(meal);
                });
        }
    });

let darkMode = localStorage.getItem('darkMode'); 

const enableDarkMode = () => {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
        enableDarkMode();
}

dark.addEventListener('click', ()=>{
        darkMode = localStorage.getItem('darkMode'); 
        if (darkMode !== 'enabled') {
          enableDarkMode();
        } else {  
          disableDarkMode(); 
        }
})

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');



menu.addEventListener('click', ()=>{
    header.classList.toggle('act');
    nav.classList.toggle('active');
})
function showMealInfo(mealData) {

    mealInfoEl.innerHTML = "";

    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${
                    mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <div class="ing-container">
            <h3>Ingredients:</h3>
            <ul>
                ${ingredients
                    .map(
                        (ing) => `
                <li>${ing}</li>
                `
                    )
                    .join("")}
            </ul>
        </div>
        <p>
        ${mealData.strInstructions}
        </p>
        <p id="ids">${mealData.idMeal}</p>
        
        
    `;
   
    mealInfoEl.appendChild(mealEl);

    const ids = document.getElementById('ids');
    const mealsId = ids.innerText;
    save.addEventListener('click', ()=>{
        var array = JSON.parse(localStorage.getItem("meals")) || [];
        var value = mealsId
        if(array.indexOf(value) == -1){
            array.push(value);
            localStorage.setItem("meals", JSON.stringify(array));
        }
})

    mealPopup.classList.remove("hidden");
}
popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});


