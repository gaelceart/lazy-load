"use strict";
const mainContainer = document.querySelector(".container");

const createPostCard = (author, post) => {
    const postCard = new DocumentFragment();
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
    postCard.appendChild(section);
    return postCard;
}

const requestData = async (num) =>{
    const request = await fetch("posts.txt");
    const content = await request.json();
    // for(let i=0; i< num; i++) {
        
    // }
    const newCards = new DocumentFragment;
    for (let i = 0; i < num; i++){
        newCards.appendChild(createPostCard(content[i].name, content[i].content))
    }
    mainContainer.appendChild(newCards)
}
requestData(3)