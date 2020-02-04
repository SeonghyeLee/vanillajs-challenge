const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

    const USER_LS = "currentUser",
          SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN)
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `hello ${text}`
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
      askForName();
    } else {
      paintGreeting(currentUser)
    }
}

function init(){
    loadName();
}

init();


/*
querySelector = 원하는 걸 가져온다 CSS의 문법으로
                클래스, 태그, 아이디... 그리고 그 중 첫번째 걸로 가져옴
querySelectorall =위랑 같은데 전부 가져옴 그리고 array를 주게 되어 있음
                    근데 이게 귀찮은게 무조건 array를 주니까... class 해당된 게 하나만 있어도 array...
                    그래서 귀찮아서 잘 안씀.[]
getElementByTagName input body html div section 이런걸로 가져오는 거

존나 섹시한건 local storage 
작은 자바스크립트 정보를 브라우져에 저장하는 거임


*/