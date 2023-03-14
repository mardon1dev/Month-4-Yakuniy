const myApiKey = `c733780456fe46dcbdd2d24fe4a40f03`;


const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${myApiKey}`;
console.log(url);

async function indormationData(){
    const row = document.querySelector(".row");
    row.innerHTML = "";
    try {
        const response = await fetch(url);
        const data = await response.json();

        const allData = data.articles.slice(0,3).map((info)=>{
            return `
            <div class="col-lg-4 col-md-4">
                  <div class="card border-0" style="width: 100%;">
                    <img src="${info.urlToImage }" class="card-img-top p-5  p-sm-2" alt="">
                    
                    <div class="card-body">
                    <div class="card-spans">
                    <span>By <span class="purple-span">${info.title}</span></span>
                    <span>${info.publishedAt.slice(0,10)}</span>
                  </div>
                      <h5 class="card-title"><a href="${info.url}">${info.title}</a></h5>
                      <p class="card-text">${info.description}</p>
                    </div>
                  </div>
                </div>
            `
        })
        row.innerHTML = allData.join("");
    } catch (error) {
        console.error(error);
    }
}
indormationData()