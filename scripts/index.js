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

loadJSON((res) => {
    let data = JSON.parse(res);

    set_news(data);
    set_awards(data);
})