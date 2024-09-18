// JavaScript Document
console.log("hi");

const button = document.querySelector("button");
const header = document.querySelector("header");

button.onclick = toggleMenu;

function toggleMenu (){
  header.classList.toggle("toonMenu")
}