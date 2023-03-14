
const myApiKey = `c733780456fe46dcbdd2d24fe4a40f03`
const url2 = `https://newsapi.org/v2/everything?q=business&apiKey=${myApiKey}`
console.log(url2);

async function searchData (){

    const inputValue = document.querySelector(".inputSearch").value;

    let url;
    if (inputValue) {
        url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${myApiKey}`
    } else {
        url = `https://newsapi.org/v2/everything?q=business&apiKey=${myApiKey}`
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const row = document.querySelector(".posts");
        row.innerHTML = "";
        if (!data.articles.length) {
            const notFound = document.createElement("div");
            notFound.className = "notfound"
            notFound.innerHTML = `<p class="not-found">Not Found <span>404</span></p>`
            row.appendChild(notFound);
        } else {
            const allData = data.articles.map((data)=>{
                return `
                <div class="col-12">
                    <div class="row post">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="postimg-wrapper">
                        <img src="${data.urlToImage}" alt="${data.title}">
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-6 col-12">
                        <div class="post-main">
                            <span class="business">BUSINESS</span>
                            <h5><a href="${data.url}" target="_blank">${data.title}</a></h5>
                            <p>${data.description}</p>
                        </div>
                    </div>
                                            
                </div>
                </div>
                `
            })
            row.innerHTML = allData.join("");
        }
    } catch (error) {
        console.error(error);
    }

}

const inputValue = document.querySelector(".inputSearch");

inputValue.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        searchData();
        inputValue.value = ""
    }
})

searchData();
