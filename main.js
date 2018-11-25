const options = document.getElementsByClassName('options')[0];
const agenda = document.getElementsByClassName('agenda')[0];

const optionItem = '<li class="optionItem" draggable="true" dragstart="drag(event)">{name}</li>';
const agendaItem = document.getElementById('agendaItemTemplate').innerHTML

const names = ['A. Olufunke','A. Marise','P. Bertók','U. Jouko','I. Erja'];
const skills = ['HTML','JavaScript','Java','Python','PHP']

for(let i=0;i<60;i++){
    options.innerHTML +=optionItem.replace('{name}',names[Math.floor(Math.random()*5)]);
}

function getSpreaker(){
    return spreaker = {

    name : names[Math.floor(Math.random()*5)],
    skills : [skills[Math.floor(Math.random()*5)]],

    }
    
}

for(let i=1;i<53;i++){
    let spreaker = getSpreaker();
    let tmpItem = agendaItem.replace('{week}',i);
    tmpItem = tmpItem.replace('{name}',spreaker.name);
    tmpItem = tmpItem.replace('{subject}',spreaker.skills[0]);
    tmpItem = tmpItem.replace('{special}','I');
    agenda.innerHTML += tmpItem;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}