let Data = data.results[0].members;
document.addEventListener("DOMContentLoaded", () => {
  printData(Data);
});
let optionParty = document.querySelector(".form-party");
optionParty.addEventListener("change", () => {
  orderParty(Data);
});
let optionState = document.querySelector(".form-state");
optionState.addEventListener("change", () => {
  orderState(Data);
});


const printData = (data) => {
  let containerTable = document.querySelector("#tbody");
  containerTable.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdNameLink = document.createElement("a");
    tdNameLink.setAttribute("href", element.url);
    tdNameLink.setAttribute("target", "_blank");
    tdNameLink.textContent = `${element.last_name}, ${element.first_name}`;
    tdName.appendChild(tdNameLink);
    let tdParty = document.createElement("td");
    tdParty.textContent = `${element.party}`;
    let tdState = document.createElement("td");
    tdState.textContent = `${element.state}`;
    let tdYIO = document.createElement("td");
    tdYIO.textContent = `${element.seniority}`;
    let tdPVotes = document.createElement("td");
    tdPVotes.textContent = `% ${element.votes_with_party_pct}`;
    tr.appendChild(tdName);
    tr.appendChild(tdParty);
    tr.appendChild(tdState);
    tr.appendChild(tdYIO);
    tr.appendChild(tdPVotes);
    containerTable.appendChild(tr);
  });
};

const orderParty = (data) => {
  if (optionParty.value == "All") {
    printData(data);
  } else {
    optionState.selectedIndex = "0"
    const option = document.querySelector(".form-party").value;
    const result = data.filter((e) => e.party == option);
    printData(result);
  }
};
const orderState = (data) =>{
  if (optionState.value == "All") {
    printData(data);
  } else {
    optionParty.selectedIndex = "0"
    const option = document.querySelector(".form-state").value;
    const result = data.filter((e) => e.state == option);
    printData(result);
  }
}
const votedWithParty = (data, partys) => {
  let count = 0
  let result = data.filter((e) => e.party == partys);
  result.forEach((el) => {
    count += el.votes_with_party_pct / result.lenght
  });
  return count
};

let prueba = votedWithParty(Data, "D")
console.log( prueba)
