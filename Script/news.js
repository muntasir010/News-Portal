const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();

    const categoryContainer = document.getElementById("category-bar-container");

    data.data.news_category.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<button onclick="  ('${item.category_id}')" class="hover:text-blue-600 btn bg-inherit border-inherit">${item.category_name}</button>`;
        categoryContainer.appendChild(div);
    });
}


const loadNews = async (catId) => {
    document.getElementById("loading-spinner").style.display = "block";
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();
    const allData = data.data;
    console.log(allData);
    const newsContainer = document.getElementById("news-container");

    newsContainer.innerHTML = '';

    allData.forEach((item) => {
        document.getElementById("loading-spinner").style.display = "none";
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card md:card-side bg-base-100 shadow-xl">
        <figure><img class="rounded-xl" src="${item.image_url}" alt="News" /></figure>
        <div class="card-body">
            <div class="flex md:ml-8 md:mr-8">
                <h2 class="card-title text-2xl">${item.title}</h2>
                <h3 class="text-xl">${item.rating.badge}</h3><sup> <h5>${item.rating.number}</h5></sup>
            </div>
            <p>Although congressional Republicans have been slamming President Joe Biden over his decision to
                withhold certain bomb shipments to Israel, such a move is not...</p>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <div>
                        <img src="./images/Avatar.png" alt="">
                    </div>
                    <div>
                        <h3>${item.author.name}</h3>[]
                        <p>${item.author.published_date}</p>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <p class="text-2xl items-center"><i class="fa-solid fa-eye"></i></p>
                    <p>${item.total_view}</p>
                </div>
                <div class="">
                    <button class="btn bg-gray-500 text-white">Details</button>
                </div>
            </div>
        </div>
    </div>
        `;
    newsContainer.appendChild(div);
    });
}


const handleSearch = ()=>{
   const value = document.getElementById("search-box").value;
    if(value){
        loadNews(value);
    }
    else{
        alert("Please enter a valid category_id");
    }
}

loadNews("01");
loadCategory();