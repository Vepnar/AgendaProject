const numbers = ['06-42423418', '06-77949568', '06-15920945', '06-58590671', '06-12183119'];
const locations = ['Almere', 'Amsterdam', 'Rotterdam', 'Den Haag', 'Groningen'];
const names = ['A. Olufunke', 'A. Marise', 'P. Bertók', 'U. Jouko', 'I. Erja'];
const skills = ['HTML', 'JavaScript', 'Java', 'Python', 'PHP', 'SQL', 'C', 'C#', 'C++', 'R', 'ASM', 'Ruby', 'Swift', 'CSS'];

const optionItem = '<li id="L{I}" onclick="optionsClick({I})" class="optionItem" draggable="true" dragstart="drag(event)">{name}</li>';
const agendaItem = document.getElementById('agendaItemTemplate').innerHTML
const subjectItem = ' <option value="{subject}">{subject}</option>'

let changed = false;

/* ##SpreakerData##
 * Sorted on timestamp
 * Name [String]
 * Phone number [String]
 * Location [String]
 * Subject [List] [String]
 * Lasttime [Int]
 */

let spreakers = [];

/* ##AgendaData##
 * Week [int]
 * Name [Int]
 * Subject [Int]
 * timestamp [Date]
 * Extra information [List]
 */

let agendaData = [];

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
let optionsClick = function(id) {
    let s = spreakers[id];

    $('#popup').css('display', 'flex');
    $('#sname').text(s[0]);
    $('#phone').text(s[1]);
    $('#location').text(s[2]);

    let options = '';
    for (let i = 0; i < s[3].length; i++) {
        options += subjectItem.replace('{subject}', s[3][i]).replace('{subject}', s[3][i]);
    }
    $('#subject').html(options);

    let a = new Date(s[4]);
    let b = a.getFullYear();
    let c = a.getMonth();
    (++c < 10) ? c = "0" + c: c;
    let d = a.getDate();
    (d < 10) ? d = "0" + d: d;
    let final = b + "-" + c + "-" + d;

    $('.optionItem').removeClass('selected')
    $('#L' + id).addClass('selected');
    $('#lasttime').text(final);
}
let nfor = function(num){

    if((num+'').length == 1){
        return '0'+num;

    }else return num;
}

let agendaClick = function(id) {

    $('.agendaItem').removeClass('selected')
    $('#A' + id).addClass('selected');

    if($('#popup').css('display') === 'flex'){
        let ad = agendaData[id];
        let date = new Date(ad[3]); 
        let datestr = nfor(date.getMonth()) + '/' + nfor(date.getDay()) + '/' + nfor(date.getFullYear());
        let timestr = nfor(date.getHours()) + ':' + nfor(date.getMinutes());

        console.log(datestr)

        $('#timebox').val(timestr);
        $('#datebox').val(datestr) ;
        

    }

}

let popupClose = function(id) {
    
    popup = $('#popup');
    popup.css('display', 'none')

}

$(function() {

    const options = document.getElementsByClassName('options')[0];
    const agenda = document.getElementsByClassName('agenda')[0];

    function GenData() {
        //Gen Spreakers
        for (let i = 0; i < 20; i++) {
            spreakers.push(
                spreaker = [
                    names[Math.floor(Math.random() * 5)],
                    numbers[Math.floor(Math.random() * 5)],
                    locations[Math.floor(Math.random() * 5)],
                    [skills[Math.floor(Math.random() * 14)], skills[Math.floor(Math.random() * 14)]],
                    1514761200000 + ((6048 * 10 ** 5) * (Math.floor(Math.random() * 52) + 1))
                ]);
        }

        //Gen Agenda items
        for (let i = 0; i < 52; i++) {

            let week = Math.floor(Math.random() * 51) + 1
            agendaData.push([
                week,
                Math.floor(Math.random() * 19) + 1,
                Math.floor(Math.random() * 1) + 1,
                1514761200000 + ((6048 * 10 ** 5) * week), []
            ]);

        }

        spreakers.sort(function(a, b) {
            return a[4] - b[4];
        });
        Math.floor(Math.random() * 2) + 1

        agendaData.sort(function(a, b) {
            return a[3] - b[3];
        });

        //Fill empty spots in agendaData
        let tmparray = [];
        let last = 0;

        for (let i = 0; i < agendaData.length; i++) {
            let ad = agendaData[i];

            if (ad[0] == last || ad[0] == last + 1) {
                tmparray.push(ad);

            } else if (ad[0] == last + 2) {
                tmparray.push([last + 1]);
                tmparray.push(ad);
                
            } else {
                for (let i2 = last + 1; i2 < ad[0]; i2++) {
                    tmparray.push([i2]);
                }

                tmparray.push(ad);

            }
            last = ad[0];
        }
        if(last != 52){
            for(let i=last+1;i<53;i++){
                tmparray.push([i]);

            }
        }
        agendaData = tmparray;

        //END

    }
    GenData();

    for (let i = 0; i < spreakers.length; i++) {
        let tmp = optionItem.replace('{I}', i).replace('{I}', i);
        options.innerHTML += tmp.replace('{name}', spreakers[i][0]);

    }

    for (let i = 0; i < agendaData.length; i++) {
        let aItem = agendaData[i];
        let tmpItem = agendaItem.replace('{week}', aItem[0]);
        tmpItem = tmpItem.replace('{id}', i).replace('{id}', i)

        if (aItem.length == 1) {
            tmpItem = tmpItem.replace('{name}', 'Niemand');
            tmpItem = tmpItem.replace('{subject}', '');
            tmpItem = tmpItem.replace('{special}', 'X');
            
        } else {
            tmpItem = tmpItem.replace('{name}', spreakers[aItem[1]][0]);
            tmpItem = tmpItem.replace('{subject}', spreakers[aItem[1]][3][aItem[2]]);
            tmpItem = tmpItem.replace('{special}', 'I');

        }
        agenda.innerHTML += tmpItem;

    };
    $(window).on("beforeunload", function() {
        if (changed) {
            return 'Er zijn dingen niet opgeslagen!';
        }
    });
});
