let Data;
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
let optionParty = document.querySelector(".form-party");
optionParty.addEventListener("change", () => {
  orderParty(Data);
});
let optionState = document.querySelector(".form-state");
optionState.addEventListener("change", () => {
  orderState(Data);
});

const fetchData = async () => {
  try {
    const res = await fetch("data/houseCongressData.json");
    const data = await res.json();
    Data = data.results[0].members;
    console.log(Data);
    printData(Data);
  } catch (error) {
    console.log(error);
  }
};
const printData = (data) => {
  let containerTable = document.querySelector("#tbody");
  containerTable.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdNameLink = document.createElement("a");
    tdNameLink.setAttribute("href", element.url);
    tdNameLink.textContent = `${element.first_name}`;
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
