let resalt = document.querySelector('.display');

let buttons =document.querySelectorAll('button');

buttons.forEach((button)=> {
    button.addEventListener('click', (e) => {
        let buttonText=e.target.innerText;
        if(buttonText === "reset") {
            resalt.innerText = '';
        }
        if(buttonText === "C") {
            resalt.innerText = resalt.innerText.slice(0, -1);
        }
        if(buttonText !== "C" && buttonText !== "reset" && buttonText !== "=") {
            resalt.innerText += buttonText
        }
        if(buttonText === "=") {
            resalt.innerText = eval(resalt.innerText);
        }
    })
})