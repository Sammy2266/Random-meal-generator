const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const videoGuideContainer = document.getElementById('videoGuideContainer');
const videoGuideButton = document.getElementById('videoGuideButton');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            // Stop if no more ingredients
            break;
        }
    }

    const newInnerHTML = `
        <div class="row meal-display">
            <div class="meal-image">
                <img src="${meal.strMealThumb}" alt="Meal Image">
            </div>
            <div class="meal-info">
                <h4>${meal.strMeal}</h4>
                ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                <h5>Ingredients:</h5>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;

    meal_container.innerHTML = newInnerHTML;
    
    if (meal.strYoutube) {
        videoGuideContainer.style.display = 'block';
        videoGuideButton.onclick = () => {
            window.location.href = `videoguide.html?videoId=${meal.strYoutube.slice(-11)}`;
        };
    } else {
        videoGuideContainer.style.display = 'none';
    }
};
