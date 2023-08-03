console.log("this works");

// const btn = document.querySelector(".btn");
const btns = document.querySelectorAll(".btn");

const doSomething = (event) => {
    let element = event()
    element.style.color = "black"
}

btns.forEach(btn => {
    btn.addEventListener('click', doSomething);
})