const filterByCategory = async (category) => {
    console.log(category)
    showLoader();
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        displayProducts(data);
    } catch (err) {
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = `<p class="text-center text-red-500 py-8">Failed to load products.</p>`;
    }
}

const showLoader = () => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-4');
    productsContainer.innerHTML = `<div class="flex justify-center items-center py-20 w-full"><span class="loading loading-dots loading-lg"></span></div>`;
}

const hideLoader = () => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
}
const activeCategoryBtn = (category) => {
    const categoryButtons = document.querySelectorAll("#categories-container button");
    categoryButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === category.toLowerCase()) {
            btn.classList.remove("btn-outline", "text-gray-600");
            btn.classList.add("btn-primary");
        } else {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline", "text-gray-600");
        }
    })
}
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    const divElement = document.createElement("div");
    const allBtn = document.createElement("button");
    allBtn.className = "btn btn-primary rounded-3xl";
    allBtn.textContent = "ALL";
    allBtn.addEventListener('click', () => { activeCategoryBtn('ALL'); loadProducts(); });
    divElement.appendChild(allBtn);
    categoriesContainer.appendChild(divElement);
    activeCategoryBtn('ALL');

    categories.forEach(category => {
        const ElementCategory = document.createElement("div");
        const btn = document.createElement("button");
        btn.className = "btn btn-outline text-gray-600 rounded-3xl";
        btn.textContent = category.toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
        btn.addEventListener('click', () => { activeCategoryBtn(category); filterByCategory(category); });
        ElementCategory.appendChild(btn);
        categoriesContainer.appendChild(ElementCategory);
    })
}
const productDetails = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    const modalContent = document.getElementById("modal_content");
    modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8 p-8">
      <div class="bg-base-200 rounded-xl p-6 flex items-center justify-center">
        <img src="${data.image}" 
             alt="${data.title}" 
             class="max-h-96 object-contain">
      </div>
      <div class="space-y-4">
        <span class="badge badge-primary badge-outline capitalize">
          ${data.category}
        </span>
        <h2 class="text-2xl font-bold leading-tight">
          ${data.title}
        </h2>
        <div class="flex items-center gap-2">
          <div class="rating rating-sm">
            <input type="radio" class="mask mask-star-2 bg-orange-400" ${data.rating.rate >= 1 ? "checked" : ""}/>
          </div>
          <span class="text-sm text-gray-500">
            ${data.rating.rate} ⭐ (${data.rating.count} reviews)
          </span>
        </div>
        <p class="text-3xl font-bold text-primary">
          $${data.price}
        </p>
        <p class="text-gray-600 text-sm leading-relaxed">
          ${data.description}
        </p>
        <div class="flex gap-4 pt-4">
          <button class="btn btn-outline flex-1">
            Add to Cart
          </button>
          <button class="btn btn-primary flex-1">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
    document.getElementById("product_modal").showModal();
};

const displayProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    productsContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-4');

    products.forEach(product => {
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
                                <button onclick="productDetails(${product?.id})" class="btn btn-outline flex-1 text-xs md:text-sm">
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
}
const loadCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    displayCategories(data);
}
const loadProducts = async () => {
    showLoader();
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        displayProducts(data);
    } catch (err) {
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = `<p class="text-center text-red-500 py-8">Failed to load products.</p>`;
        console.error(err);
    }
}
loadCategories();
loadProducts();