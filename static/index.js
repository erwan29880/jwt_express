"use strict";
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const id = document.querySelector("#del");
const envoyer = document.querySelector("#envoyer");
const suppr = document.querySelector("#suppr");
const container = document.querySelector("#container");
const results = document.querySelector("#mef");


const modifyMessage = (message) => {
    const p = document.createElement("p");
    p.innerText = message;

    container.innerHTML = "";
    container.appendChild(p);
}


const mef = (obj) => {
    results.innerHTML = "";
    for (let o of obj) {
        const p = document.createElement("p");
        p.innerText = o.id + " : nom : " + o.nom + ", prénom : " + o.prenom;
        results.appendChild(p);
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
            nom: nom.value,
            prenom: prenom.value
        })
    }).then(res => res.json())
    .then(res => modifyMessage(res.message));

    getData();
}


const delData = async() => {
    await fetch('/deldata/'+ id.value, {method: "DELETE"})
    .then(res => res.json())
    .then(res => modifyMessage(res.message))

    getData();
}


envoyer.addEventListener("click", postData);
suppr.addEventListener("click", delData);

getData();