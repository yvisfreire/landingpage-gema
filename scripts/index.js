function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', './scripts/gema_data.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };

    xobj.send(null);  
}

function set_news(data) {
    let cards = document.querySelector('.news-cards').children;

    for (let i = 0; i < cards.length; i++) {
        cards[i].children[0].src = data.Noticias[i].imagem;
        cards[i].children[1].textContent = data.Noticias[i].titulo;  
    }
}

function set_awards(data) {
    let cards = document.querySelector('.award-cards').children;

    for (let i = 0; i < cards.length; i++) {
        cards[i].children[0].src = data.campeonatos[i].imagem;

        cards[i].children[1].children[0].children[1].textContent = data.campeonatos[i].medalhas.ouro.total;
        cards[i].children[1].children[1].children[1].textContent = data.campeonatos[i].medalhas.prata.total;
        cards[i].children[1].children[2].children[1].textContent = data.campeonatos[i].medalhas.bronze.total;

        cards[i].children[2].textContent = `${data.campeonatos[i].nomeCompleto} (${data.campeonatos[i].nome})`;  
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadJSON((res) => {
        data = JSON.parse(res);
    
        set_news(data);
        set_awards(data);
    })
    
    console.log('DOM fully loaded and parsed');
});

function open_modal(index) {
    let modal = document.getElementById('modal');
    let modal_content = document.getElementById('awards-per-year');

    loadJSON((res) => {
        data = JSON.parse(res);
    
        document.getElementById('award-icon').src = data.campeonatos[index].imagem;
        document.getElementById('award-title').textContent = `${data.campeonatos[index].nomeCompleto} (${data.campeonatos[index].nome})`;

        let year_count = 0;
        let length = Object.keys(data.campeonatos[index].anos).length
        for (let year in data.campeonatos[index].anos) {
            let year_div = document.createElement('div');
            let year_heading = document.createElement('h3');
            year_heading.textContent = year;
            year_div.appendChild(year_heading)
            //console.log(data.campeonatos[index].anos[year][0]);

            for (let i = 0; i < data.campeonatos[index].anos[year].length; i++) {
                let medal_info = document.createElement('div');
                medal_info.className = 'medal-info';

                let place = document.createElement('p');
                place.textContent = `${data.campeonatos[index].anos[year][i].posicao}°`

                let medal_icon = document.createElement('img');
                medal_icon.src = `./images/${data.campeonatos[index].anos[year][i].medalha}.svg`;

                let contestant_name = document.createElement('p');
                contestant_name.textContent = data.campeonatos[index].anos[year][i].nome;

                medal_info.appendChild(place);
                medal_info.appendChild(medal_icon);
                medal_info.appendChild(contestant_name);

                year_div.appendChild(medal_info);
            }        

            modal_content.appendChild(year_div);

            if (year_count != length - 1) {
                let division_line = document.createElement('hr');
                console.log(division_line);
                modal_content.appendChild(division_line);
            }
            
            year_count++;
        }
    })

    modal.style.display = "block";
}

function close_modal() {
    document.getElementById('awards-per-year').innerHTML = '';
    document.getElementById('modal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('awards-per-year').innerHTML = '';
        document.getElementById('modal').style.display = "none";
    }
}
  