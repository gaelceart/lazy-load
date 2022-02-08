"use strict";
const mainContainer = document.querySelector(".container");

const createPostCard = (author, post) => {
    const postCard = new DocumentFragment();
    const section = document.createElement("SECTION");  
    const name = document.createElement("H2");
    const content = document.createElement("DIV");

    section.classList.add("post-card");
    name.classList.add("post-author")
    content.classList.add("post-content");

    name.textContent = author;
    content.textContent = post;
    section.appendChild(name);
    section.appendChild(content);
    postCard.appendChild(section);
    mainContainer.appendChild(postCard);
}

const requestData = async () =>{
    const request = await fetch("posts.txt");
    const content = await request.json();
    createPostCard(content.name, content.content);
    console.log(content);
}

requestData()