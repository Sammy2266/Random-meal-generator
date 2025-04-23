const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const loading_indicator = document.getElementById('loader'); // Corrected ID reference

get_meal_btn.addEventListener('click', () => {
    // Show loading indicator
    loading_indicator.classList.remove('hidden');
    meal_container.innerHTML = ''; // Clear previous meal

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        })
        .catch(() => {
            meal_container.innerHTML = `<p>Failed to fetch meal. Please try again later.</p>`;
        })
        .finally(() => {
            // Hide loading indicator
            loading_indicator.classList.add('hidden');
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    const newInnerHTML = `
        <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory || 'N/A'}</p>
            <p><strong>Area:</strong> ${meal.strArea || 'N/A'}</p>
            <h4>Ingredients:</h4>
            <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <p>${meal.strInstructions}</p>
            ${meal.strYoutube ? `
            <div class="videoWrapper">
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" allowfullscreen></iframe>
            </div>` : ''}
        </div>
    `;

    meal_container.innerHTML = newInnerHTML;
};
