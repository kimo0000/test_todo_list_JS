const popup = document.querySelector('#popup');
const inputText = document.querySelector("#item");
const form = document.querySelector("form");
const submit = document.querySelector('#submit');
const clearAll = document.querySelector('.clear_all')
const results = document.querySelector("#results");

let mode = 'create';
let temp;

let arrayItems;
if (localStorage.getItem("item")) {
  arrayItems = JSON.parse(localStorage.getItem("item"));
} else {
  arrayItems = [];
}

// console.log(arrayItems);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let value = inputText.value;
  if (value != "") {
    if(mode === 'create') {
        arrayItems.push(value);
        popupDesc('Item Added', "success");
    } else {
        arrayItems[temp] = inputText.value;
        submit.innerHTML = 'submit';
        mode = 'create';
        popupDesc('Item Updated', "success");
    }
} else {
    popupDesc('Please Enter Item', "danger");
}

    localStorage.setItem("item", JSON.stringify(arrayItems));
    showData(arrayItems);
    inputText.value = "";
});

function showData(arrayItems) {
  let items = "";
//   console.log(arrayItems);
  for (let i = 0; i < arrayItems.length; i++) {
    items += `
         <div class="item">
                <span>${arrayItems[i]}</span>
                <p class="btns">
                    <button id="update" onclick="updateItem(${i})">update</button>
                    <button id="delete" onclick="deleteItem(${i})">delete</button>
                </p>
            </div>
    `;
  }
//   console.log(items);
  results.innerHTML = items;
   if(arrayItems.length) {
       clearAll.innerHTML = `<button class="btn_all" onclick="btnClear()">Clear All (${arrayItems.length})</button>`;
    } else {
       clearAll.innerHTML = "";
    }
}

showData(arrayItems);

function deleteItem(i) {
    arrayItems.splice(i, 1);
    localStorage.setItem("item", JSON.stringify(arrayItems));
    console.log(arrayItems.length);
    showData(arrayItems);
    popupDesc('Item Delete', "danger")
}

function updateItem(i) {
    // console.log(i)
    mode = "update";
    temp = i;
    // console.log(temp);
    inputText.value = arrayItems[i];
    submit.innerHTML = 'update';
}

function btnClear() {
    arrayItems.splice(0);
    localStorage.clear();
    showData(arrayItems);
    clearAll.style.display = 'none';
}

function popupDesc(text, action) {
     popup.innerHTML = text;
     popup.classList.add(action);
     setTimeout(() => {
         popup.innerHTML = '';
         popup.classList.remove(action);
     }, 2000)
}
