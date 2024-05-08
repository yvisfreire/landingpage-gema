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

loadJSON((res) => {
    let data = JSON.parse(res);

    set_news(data);
})