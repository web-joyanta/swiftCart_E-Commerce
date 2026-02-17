const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(category => {
        const ElementCategory = document.createElement("div");
        ElementCategory.innerHTML = `<div class="btn btn-outline text-gray-600 rounded-3xl">${category.toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</div>`
        categoriesContainer.appendChild(ElementCategory);
    })
}
const prod = {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
    "rating": {
        "rate": 2.9,
        "count": 340
    }
}
const displayProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    products.forEach(product => {
        console.log(product)
        const divElement = document.createElement("div");
        divElement.innerHTML = `
                    <div class="card w-full  bg-base-100 shadow-md hover:shadow-xl transition duration-300 flex flex-col">
                        <figure class="p-4 bg-gray-100 flex-shrink-0 h-48 md:h-56 lg:h-64">
                            <img class="w-full h-full object-contain" src="${product?.image}" alt="${product?.title}" />
                        </figure>
                        <div class="card-body flex flex-col flex-1 justify-between">
                            <div class="flex justify-between items-center text-sm mb-2">
                                <span class="badge badge-primary badge-outline rounded-3xl text-xs md:text-sm">
                                   ${product?.category}
                                </span>
                                <span class="text-yellow-500 font-semibold text-xs md:text-sm">
                                    <i class="fa-solid fa-star"></i> ${product?.rating?.rate} (${product?.rating?.count})
                                </span>
                            </div>
                            <h2 class="card-title text-base md:text-lg font-medium truncate" title="${product?.title}">
                                ${product?.title.length > 30 ? product?.title.slice(0, 30) + "..." : product?.title}
                            </h2>
                            <p class="text-lg md:text-xl font-bold mt-1">$${product?.price}</p>
                            <div class="card-actions justify-between mt-4 gap-2">
                                <button class="btn btn-outline flex-1 text-xs md:text-sm">
                                    <i class="fa-solid fa-eye"></i> Details
                                </button>
                                <button class="btn btn-primary flex-1 text-xs md:text-sm">
                                    <i class="fa-solid fa-cart-shopping"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                    `
        productsContainer.appendChild(divElement);
    })
    console.log(products);
}
const loadCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    displayCategories(data);
}
const loadProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    displayProducts(data);
}
loadCategories();
loadProducts();