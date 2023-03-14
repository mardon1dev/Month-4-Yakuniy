const baseUrl = `https://fakestoreapi.com/products`

const addPost = document.querySelector(".addpost");
const form = document.querySelector("#user-form");
const someData = document.querySelector(".addpost");
const addPostBtn = document.querySelector("#create-button")


console.log(baseUrl);

const getData = (url)=>{
    return new Promise((resolve, reject)=>{
        fetch(url).then(response=>{
            if(response.ok){
                return response.json()
            }
            else{
                return new Error("Not Found")
            }
        }).then((data)=>{
            if (data) {
                resolve(data)
            } else {
                reject(data)
            }
        })
    })
}

getData(baseUrl).then(data=>{
    data.slice(0,10).map((info)=>{
        const postWrapper = document.createElement("div");
        postWrapper.className = "col-lg-3 col-md-6 col-sm-12 newpost";
        postWrapper.setAttribute("data-id", `${info.id}`);

        const postOneWrapper = document.createElement("div");
        postOneWrapper.className = `card border-0`

        const postOne = document.createElement("div");
        postOne.className = "card-body d-flex flex-column align-items-center";
        postOne.style.width = "100%";

        const postImage = document.createElement("img");
        postImage.src = info.image;
        postImage.alt = info.title;

        const postName = document.createElement("span");
        postName.className = "card-title";
        postName.textContent = info.title;

        const postDescription = document.createElement("p");
        postDescription.className = "card-text";
        postDescription.textContent = info.description;

        const postId = document.createElement("h3");
        postId.className = "card-id";
        postId.textContent = info.id

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.className = "delete-button"

        const editButton = document.createElement("button");
        editButton.textContent = "Edit"
        editButton.className = "edit-button"

        postOne.append(postId, postName,postDescription, deleteButton, editButton);
        postOneWrapper.append(postImage, postOne);
        postWrapper.append(postOneWrapper)
        someData.append(postWrapper)
    })

}).catch((error)=>{
    console.error(error);
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const id = document.getElementById("id-change").value;
    const postTitle = document.getElementById("post-name").value;
    const postText = document.getElementById("text").value;
    const avatar = document.getElementById("file").files[0];

    if (id) {
        updatePost(id, postTitle, postText);
        form.reset();
    } else {
        const newPost = {
            title: postTitle, 
            description: postText
        }
        fetch(baseUrl, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newPost) 
        }).then(response=>response.json())
        .then(data=>{
    
            const reader = new FileReader();
            reader.readAsDataURL(avatar);
    
            reader.onload = ()=>{
                const avatarUrl = reader.result
    
                const postWrapper = document.createElement("div");
                postWrapper.className = "col-lg-3 col-md-6 col-sm-12 newpost";
                postWrapper.setAttribute("data-id", `${data.id}`);

    
                const postOneWrapper = document.createElement("div");
                postOneWrapper.className = `card border-0`
        
                const postOne = document.createElement("div");
                postOne.className = "card-body d-flex flex-column align-items-center";
                postOne.style.width = "100%";
        
                const postImage = document.createElement("img");
                postImage.src = avatarUrl;
                postImage.alt = data.title;
        
                const postName = document.createElement("span");
                postName.className = "card-title";
                postName.textContent = data.title;
    
                const postDescription = document.createElement("p");
                postDescription.className = "card-text";
                postDescription.textContent = data.description;
    
                const postId = document.createElement("h3");
                postId.className = "card-id";
                postId.textContent = data.id
    
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete"
                deleteButton.className = "delete-button"
    
                const editButton = document.createElement("button");
                editButton.textContent = "Edit"
                editButton.className = "edit-button"
    
                postOne.append(postId, postName,postDescription, deleteButton, editButton);
                postOneWrapper.append(postImage, postOne);
                postWrapper.append(postOneWrapper)
                someData.append(postWrapper) 
               form.reset();
            }
        })
    }

})

someData.addEventListener("click", (e)=>{
   
    if (e.target.classList.contains("delete-button")) {
        const id = e.target.parentElement.dataset.id;
        deletePost(id).then(()=>{
            const deletedPOst = e.target.closest(".newpost")
            deletedPOst.remove();
        }).catch((error)=>{
            console.error(error);
        })
    }
    else if(e.target.classList.contains("edit-button")){
        const parent = e.target.parentElement;
        let idPost = parent.querySelector(".card-id").textContent;
        let titlePost = parent.querySelector(".card-title").textContent;
        let descriptionPost = parent.querySelector(".card-text").textContent;

        document.getElementById("file").style.display = "none"
        form.querySelector("#id-change").value = idPost;
        form.querySelector("#post-name").value = titlePost;
        form.querySelector("#text").value = descriptionPost;

        document.querySelector("#create-button").textContent = "Update User";
    }
})

async function deletePost(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return response.text();
        }
    } catch (error) {
        return console.error(error);
    }
}

async function updatePost (idPost, titlePost, descriptionPost){
    const postData = {
        title: titlePost,
        description: descriptionPost
    }
    try {
        const response = await fetch(`${baseUrl}/${idPost}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body:  JSON.stringify(postData)
        });
        const data = await response.json();
        const allpost = document.querySelectorAll(".card");
        for (let allp of allpost) {
            if (allp.querySelector(".card-id").textContent=== idPost.toString()) {
                allp.querySelector(".card-title").textContent = titlePost;
                allp.querySelector(".card-text").textContent = descriptionPost;
            }
        }
      document.querySelector("#create-button").textContent = "Save";
      document.querySelector("#file").style.display = "block";
      return data;
    } catch (error) {
        console.error(error);
    }
}