const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const header = document.querySelector('header');
const links = document.querySelectorAll('.link')
const container = document.querySelector('.todo-container')


window.addEventListener('scroll', ()=>{
        header.classList.toggle('change',window.scrollY > 1);
        for(i=0; i<links.length; i++){
            links[i].classList.toggle('diff', window.scrollY>1);
        }
});

getMeals();

const dark = document.querySelector('.darkMode');

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
});
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');



menu.addEventListener('click', ()=>{
    header.classList.toggle('act');
    nav.classList.toggle('active');
})

async function getMealsById(id) {
        const resp = await fetch(
            "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
        );
    
        const respData = await resp.json();
        const meals = respData.meals[0];
    
        return meals;
    }
const mealsEl = document.querySelector('.todo-container')

function addMeal(mealData) {
        console.log(mealData);

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
    
        const meal = document.createElement("div");
        meal.classList.add("card");
    
        meal.innerHTML = `
            <button  class="delete">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </button>
            <img src="${mealData.strMealThumb}" alt="">
            <h1>${mealData.strMeal}</h1>
            <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
            </ul>
            <p id="remove-ls">${mealData.idMeal}</p>
        `
        mealsEl.appendChild(meal)

        const name = meal.querySelector('h1');

        name.addEventListener("click", () => {
                showMealInfo(mealData);
            });
        const deleteLS = meal.querySelector('.delete');

        
                deleteLS.addEventListener('click', ()=>{
                        removeMealLS(mealData.idMeal);
        
                        getMeals();
                        
                })
            
        
        

};
function removeMealLS(mealId) {
        const mealIds = getMealsLS();
    
        localStorage.setItem(
            "meals",
            JSON.stringify(mealIds.filter((id) => id !== mealId))
        );
}
    
function getMealsLS() {
        const mealIds = JSON.parse(localStorage.getItem("meals"));
        console.log(mealIds);
    
        return mealIds === null ? [] : mealIds;
}



async function getMeals() {

        container.innerHTML = '';

        const ids = JSON.parse(localStorage.getItem('meals'));
        console.log(ids);
        
        for(i = 0; i<ids.length; i++){
                const id = ids[i];
                meal = await getMealsById(id);

                addMeal(meal);
        }
}

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
        
        mealPopup.classList.remove("hidden");
    }
    popupCloseBtn.addEventListener("click", () => {
        mealPopup.classList.add("hidden");
});


