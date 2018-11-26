const numbers = ['06-42423418','06-77949568','06-15920945','06-58590671','06-12183119'];
const locations = ['Almere','Amsterdam','Rotterdam','Den Haag','Groningen'];
const names = ['A. Olufunke','A. Marise','P. Bertók','U. Jouko','I. Erja'];
const skills = ['HTML','JavaScript','Java','Python','PHP'];

const optionItem = '<li id="L{I}" onclick="optionsClick({I})" class="optionItem" draggable="true" dragstart="drag(event)">{name}</li>';
const agendaItem = document.getElementById('agendaItemTemplate').innerHTML
const subjectItem = ' <option value="{subject}">{subject}</option>'

let changed = false;
let spreakers = [];

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
let optionsClick = function(id){
    let s = spreakers[id];
    $('#popup').css('display','flex');
    $('#sname').text(s[0]);
    $('#phone').text(s[1]);
    $('#location').text(s[2]);
    let options = '';
    for(let i=0;i<s[3].length;i++){
        options+=subjectItem.replace('{subject}',s[3][i]).replace('{subject}',s[3][i]);
    }
    $('#subject').html(options);
    let a = new Date(s[4]);
    let b = a.getFullYear();
    let c = a.getMonth();
    (++c < 10)? c = "0" + c : c;
    let d = a.getDate();
    (d < 10)? d = "0" + d : d;
    let final = b + "-" + c + "-" + d; 


    $('#lasttime').text(final);

}

let popupClose = function(){
    popup = $('#popup');
    popup.css('display','none')
}

$(function(){
    const options = document.getElementsByClassName('options')[0];
    const agenda = document.getElementsByClassName('agenda')[0];

    function getSpreaker(){
        for(let i=0;i<52;i++){
            spreakers.push(
            spreaker = [
            names[Math.floor(Math.random()*5)],
            numbers[Math.floor(Math.random()*5)],
            locations[Math.floor(Math.random()*5)],
            [skills[Math.floor(Math.random()*5)],skills[Math.floor(Math.random()*5)]],
            Math.floor(Math.random()*356)*86400000+1543262197361
            
            ]);
        }   
        spreakers.sort(function(a, b) {
            return a[4] - b[4];
        });
        
    }
    getSpreaker();

    for(let i=0;i<spreakers.length;i++){
        let tmp = optionItem.replace('{I}',i).replace('{I}',i);;
        options.innerHTML +=tmp.replace('{name}',spreakers[i][0]);
    }

    for(let i=1;i<53;i++){
        let spreaker = spreakers[i-1];
        let tmpItem = agendaItem.replace('{week}',i);
        tmpItem = tmpItem.replace('{name}',spreaker[0]);
        tmpItem = tmpItem.replace('{subject}',spreaker[3][0]);
        tmpItem = tmpItem.replace('{special}','I');
        agenda.innerHTML += tmpItem;
    }

});
$(window).on("beforeunload", function() { 
    if(changed){
        return 'Er zijn dingen niet opgeslagen!';
    }
});