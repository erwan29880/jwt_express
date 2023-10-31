"use strict";
const pseudo = document.querySelector("#pseudo");
const password = document.querySelector("#password");
const envoyer = document.querySelector("#envoyer");
const pseudo2 = document.querySelector("#pseudo2");
const password2 = document.querySelector("#password2");
const envoyer2 = document.querySelector("#envoyer2");
const container = document.querySelector("#container");
const results = document.querySelector("#mef");


const modifyMessage = (message) => {
    const p = document.createElement("p");
    p.innerText = message;
    p.style.fontWeight = "bold";

    container.innerHTML = "";
    container.appendChild(p);
}


const mef = (obj) => {
    results.innerHTML = "";
    for (let o of obj) {
        const p = document.createElement("p");
        const button = document.createElement("button");
        button.innerText = "\ud83d\uddd1";
        p.innerText = o.id + " : pseudo : " + o.pseudo + ", password : " + o.password;
        results.appendChild(p);
        results.appendChild(button);

        button.addEventListener("click", () => {
            delData(o.id)
        })
    }
}


const getData = async() => {
    await fetch('/getdata')
    .then(res => res.json())
    .then(res => mef(res));
}

const postData = async () => {
    await fetch('/postdata', {
        method: "POST", 
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            pseudo: pseudo.value,
            password: password.value
        })
    }).then(res => res.json())
    .then(res => modifyMessage(res.message));

    setTimeout(() => getData(), 400);
}


const delData = async(id) => {
    await fetch('/deldata/'+ id, {method: "DELETE"})
    .then(res => res.json())
    .then(res => modifyMessage(res.message))

    setTimeout(() => getData(), 400);
}


envoyer.addEventListener("click", postData);

getData();