const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    toDoList= document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


/*
1. console.dir로 어느 target을 끌어와야 하는지 검색해서 알아볼 수 있다.

function deleteTodo(event){
    console.dir(event.target);
}

부모 속성의 li를 찾아주는 게 parentNode구나 

2. function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
toDolist 상에서 위에 클릭 된 li의 자식들을 삭제시켜줌

3. toDos.filter() 은
 filter는 마치 forEach에서 function을 실행 시키는 것과 같다.
 각각의 item과 같이 실행 됨. filter가 하는 것은 'array'를 하나 만드는 것 과 같다.
 with items, 해당 function을 true로 돌려주는 값들을 모은 'array'를 만드는 것과 같다.
 이 경우, toDos는 object가 있고 그 object는 숫자로 된 id가 있음.


function filterFn(toDo){
    return toDo.id === 1;
}
function deleteTodo(event){
     const cleanToDos = toDos.filter(filterFn);
    console.log(cleanToDos);}

    그래서 이 경우에 실행하면, 
    id 값이 1인 아이템으로 구성된 LIST를 만들어주게 되어있음

4. 작동이 안되네? 왜냐면 string과 number일 경우가 이거든 이거 두개는
다른걸로 인지가 되지 console.log를 통해서 알아보고 나서 
function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id)
        return toDo.id !== li.id;
    });
}
 */

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id= newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : toDos.length + 1,
    };
    toDos.push(toDoObj);
    saveToDos();
}

// (1) li에 ID 주기 (2) text toDoObj에 ID 주기가 같이 되어야 하는 건
// local storage 저장하기 위해서임
// localStorage에는 오직 string만 저장 가능함. 즉 자바스크립트 언어는 저장이 안됨
// object를 string으로 바꿔야 함 JSON.stringify()를 씁시다.

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }
        )
    }
}


// string을 object로 바꿔야 함 JSON.parse()를 씁시다.
// saving 할때랑 그걸 다시 바꿔주는 역할임\

/* .forEach는 각각에게 실행시켜주는 걸 의미함. 즉 
 parseToDos d의 각각의 아이템에 Function을 실행해주는데 toDo라는text에 대한 걸 실행시키겠다
 뭘 실행시킬거냐면 function paintToDo(toDo-여기서 toDo는 그냥 any를 대체하는 대체어임
    왜냐하면 모든 것 중에 text를 긁어오게끔 해야 하기 때문이지) 를 시킬거다 (toDo-any중에서-.Text) todo의 text 내용을 긁어와라.
    
    윗단락에서 아래처럼 정의한 걸 가지고 오게끔 해 주는 거임. ok?

    const toDoObj = {
        text : text,
        id : toDos.length + 1,
    };

    다음과 같이 빼서 쓸 수도 있음.

<풀어쓴 버젼>

function something(toDo){
        paintToDo(toDo.text);
}

    function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something)};
    }
}

<안에 넣어서 짧게 한 버젼>


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}
*/

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();