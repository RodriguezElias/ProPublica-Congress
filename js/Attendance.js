let Data = data.results[0].members;
let least = [];
let most = [];
let trDemocrats = document.querySelector("#trDemocrats");
let trRepublicans = document.querySelector("#trRepublicans");
let trIndependents = document.querySelector("#trIndependents");
let trTotal = document.querySelector("#trTotal");
const tbodyLeast = document.querySelector("#tbodyLeast");
const tbodyMost = document.querySelector("#tbodyMost");

document.addEventListener("DOMContentLoaded", () => {
  printTableGlance(Data, "D", trDemocrats);
  printTableGlance(Data, "R", trRepublicans);
  printTableGlance(Data, "I", trIndependents);
  totalreps();
  orderMostLeastData(Data);
const tbodyLeast = document.querySelector("#tbodyLeast");
  printTableOrder(least,tbodyLeast)
  printTableOrder(most,tbodyMost)
});
const votedWithParty = (data, partys) => {
  let count = 0;
  let result = data.filter((e) => e.party === partys);
  result.forEach((el) => {
    count += el.votes_with_party_pct / result.length;
  });
  return count.toFixed(2);
};
const numberOfReps = (data, partys) => {
  let result = data.filter((e) => e.party === partys);
  return result.length;
};
const totalreps = () => {
  result = 0;
  let dem = numberOfReps(Data, "D");
  let rep = numberOfReps(Data, "R");
  let ind = numberOfReps(Data, "I");
  result = dem + rep + ind;
  tdTotal = document.createElement("td");
  tdTotal.textContent = result;
  tdTotal2 = document.createElement("td");
  trTotal.appendChild(tdTotal);
  trTotal.appendChild(tdTotal2);
};

const orderMostLeastData = (data) => {
  data.sort((min, max) => {
    if (min.missed_votes_pct > max.missed_votes_pct) {
      return 1;
    }
    if (min.missed_votes_pct < max.missed_votes_pct) {
      return -1;
    }
    return;
  });
  for (let i = 0; i < data.length * 0.10; i++) {
    most.push(data[i]);
  }
  data.reverse();
  for (let j = 0; j < data.length * 0.10; j++) {
    least.push(data[j]);
  }
};

const printTableGlance = (data, partys, tableparty) => {
  let nor = votedWithParty(data, partys);
  let numberNor = numberOfReps(data, partys);
  let vwp = votedWithParty(data, partys);
  let tdNor = document.createElement("td");
  tdNor.textContent = `${numberNor}`;
  let tdvwp = document.createElement("td");
  tdvwp.textContent = `${nor} %`;
  tableparty.appendChild(tdNor);
  tableparty.appendChild(tdvwp);
};
const printTableOrder = (array, table) => {
  array.forEach((el) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdNameLink = document.createElement("a")
    tdNameLink.setAttribute("href", el.url);
    tdNameLink.setAttribute("target", "_blank");
    tdNameLink.textContent = `${el.last_name}, ${el.first_name}`;
    tdName.appendChild(tdNameLink)
    const tdNumberOfMissed = document.createElement("td");
    tdNumberOfMissed.textContent = `${el.missed_votes}`;
    const tdNumberPrMissed = document.createElement("td");
    tdNumberPrMissed.textContent = `${el.missed_votes_pct} %`;
    tr.appendChild(tdName)
    tr.appendChild(tdNumberOfMissed)
    tr.appendChild(tdNumberPrMissed)
    table.appendChild(tr);
  });
};
