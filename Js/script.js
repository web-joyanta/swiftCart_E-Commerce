const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(category => {
        const ElementCategory = document.createElement("div");
        ElementCategory.innerHTML = `<div class="btn btn-outline text-gray-600 rounded-3xl">${category.toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</div>`
        categoriesContainer.appendChild(ElementCategory);
    })
}
const loadCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    displayCategories(data);
}
loadCategories();