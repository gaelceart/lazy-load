"use strict";
const mainContainer = document.querySelector(".container");
let indexOfPosts = 0;
let fullLoad = false;

const createPostCard = (author, post) => {
    const section = document.createElement("SECTION");  
    const name = document.createElement("H2");
    const content = document.createElement("DIV");
    const commentSection = document.createElement("DIV");
    const comment = document.createElement("INPUT");
    const send = document.createElement("INPUT");

    comment.setAttribute("type","text");
    send.setAttribute("type","submit");
    send.setAttribute("value","Comment");

    commentSection.classList.add("comment-section");
    comment.classList.add("comment-box");
    send.classList.add("comment-send");
    
    section.classList.add("post-card");
    name.classList.add("post-author")
    content.classList.add("post-content");

    name.textContent = author;
    content.textContent = post;
    section.appendChild(name);
    section.appendChild(content);


    commentSection.appendChild(comment);
    commentSection.appendChild(send);

    section.appendChild(commentSection);
    return section;
}

const loadMorePosts = entry => {if (entry[0].isIntersecting) requestData(2)}

const observer = new IntersectionObserver(loadMorePosts);

const requestData = async (num) =>{
    const request = await fetch("posts.txt");
    const content = await request.json();
    const data = content.data;
    console.log(data[0].name);
    const newCards = new DocumentFragment;
    for (let i = 0; i < num; i++){
        console.log(fullLoad)
        if (data[indexOfPosts] == undefined){ 
            if (fullLoad) break;
            let noMorePosts = document.createElement("H3");
            noMorePosts.textContent = "There are no more posts to load :|";
            newCards.appendChild(noMorePosts);            
            mainContainer.appendChild(newCards)
            fullLoad = true;
            break;
        }
        const card = createPostCard(data[indexOfPosts].name, data[indexOfPosts].content)
        newCards.appendChild(card)
        indexOfPosts++;
        if (i == num-1) observer.observe(card)
        mainContainer.appendChild(newCards)
    }
}

requestData(4)


const appendContentTo = (content, parent) => {
    const comment = document.createElement("SECTION");
    const name = document.createElement("H5");
    const text = document.createElement("P");

    comment.classList.add("comment");
    name.textContent = "YOU"
    text.textContent = content;

    comment.appendChild(name);
    comment.append(text);
    parent.appendChild(comment);
}


document.addEventListener("click", (e) =>{
    if (e.target && e.target.className ==  "comment-send"){
        const inputContent = e.target.parentNode.querySelector(".comment-box");

        if (inputContent.value != "") appendContentTo(inputContent.value, e.target.parentNode.parentNode)
        inputContent.value = "";
    }
}) 

