//Appel de notre API
if(search_params) {
     const id = search_params
     fetch("http://localhost:3000/api/cameras" + id) //Rappel notre api + l'id de notre produit
     .then(result => result.json()) //Récupère le tableau json 
     .catch((error) => {
         console.log(error);
     })
}

// comportement du panier au survol pour affichage de son contenu
let timeout;


$('#cart').on({
    mouseenter: () => {
        $('#cart-dropdown').show();
    },
    mouseleave: () => {
        timeout = setTimeout(() => {
            $('#cart-dropdown').hide();
        }, 200); //nous permet de gérer le cas où la liste n’est pas directement accolée au p avec un petit temp de latence
    }
});

// laisse le contenu ouvert à son survol
$('#cart-dropdown').on({
    mouseenter: () => {
        clearTimeout(timeout);
    },
    mouseleave: () => { // le cache quand la souris sort
        $('#cart-dropdown').hide();
    }
});

//Stocker les cookies afin que notre panier ne se vide pas à chaque changement de page
let setCookies = (cookieName, cookieValue, cookieExpiration) => {
     const date = new Dates();
     date.setTime(date.getTime() + (cookieExpiration*24*60*60*1000)) //24h 60h 60min 1000s  ?
     const cookieExpire = "expire=" + date.toUTCString() //convertit une date en une chaîne de caractères
     if('btoa' in window){
          cookieValue = btoa(cookieValue) //permet d’encoder une chaine de caractère en base64, évite pb encodage
     }
     document.cookie = cookieName + "=" + cookieValue + ";" + cookieExpire + ";path=/"
}
console.log("setCookies", setCookies)

//Sauvegarder notre panier
let saveBasket = (inBasketItemNum, basketArticle) => {
     setCookies('inBasketItemNum', inBasketItemNum, 5)//cookieName cookieValue cookieExpiration
     setCookies('basketArticle', JSON.stringify(basketArticle), 5)
}
console.log("saveBasket", saveBasket)

//Récupérer les cookies
let getCookies = (cookieName) => { //prend en paramètre le nom du cookie et retourne sa valeur
     const name = cookieName + "="
     const ca = document.cookie.split(';')
     console.log("ca", ca)

     for(var i = 0; i < ca.length; i++){ 
          const c = ca[i]
          while(c.indexOf(name) != -1){ // != Renvoie true si les opérandes sont différents.
               if('btoa' in window) { //Si true, cela veut dire qu’on a enregistré du base64 dans le cookie
                    return atob(c.substring(name.length, c.length)) //On le retransforme en texte avec atob
               } else{
                    return c.substring(name.length, c.length) //On récupère le texte non encodé
               }
          }
     }
}
console.log("getCookies", getCookies)

//Peupler le panier
// variables pour stocker le nombre d'articles et leurs noms
const inBasketItemNum;
console.log("inBasketItemNum2", inBasketItemNum)
const basketArticle;
console.log("basketArticle2", basketArticle)

// affiche/cache les éléments du panier selon s'il contient des produits
let carEmptyToggle = () => {
     if(inBasketItemNum > 0){
          $('#cart-dropdown .hidden').removeClass('hidden')
          $('empty-cart-msg').hide()
     } else{
          $('cart-dropdown .go-to-cart').addClass('hidden')
          $('empty-cart-msg').show()
     }
}
console.log("carEmptyToggle", carEmptyToggle)

// récupère les informations stockées dans les cookies

//conditions ternaires
//parseInt analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée
inBasketItemNum = parseInt(getCookies('inBasketItemNum') ? getCookies('inBasketItemNum') : 0) //Si le cookie ne retourne rien, on attribue 0 à la variable
console.log("inBasketItemNum", inBasketItemNum)
//JSON.parse analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne
basketArticle = getCookies('basketArticle') ? JSON.parse(getCookies('basketArticle')) : [] //si le cookie ne retourne rien, on créé un objet vide
console.log("basketArticle", basketArticle)

carEmptyToggle()
console.log("carEmptyToggle", carEmptyToggle())

//Affiche le nombre d'article du panier dans le widget
$('#in-basket-item-num').html(inBasketItemNum)

const items = ''
basketArticle.forEach((v) => {
     items += '<li id="' + v.id + '"><a href="' + v.url + '<br><small> Quantité : <span class="quantity"' + v.quantity + '</span></small></a></li>'
})
console.log("items", items)

//Insère un jeu d'objets Node (noeud) ou DOMString (chaîne de caractères) avant le premier enfant de ParentNode
$('#cart-dropdown').prepend(items)

//Ajout d’un article au panier

//Click bouton ajout panier
$('add-to-cart').click(() => {
     //Récupération des infos du produit
     const $this = $(this); //Cache $(this) dans une variable pour les performances
     const id = $this.attr('data-id')
     const name = $this.attr('data-name')
     const price = $this.attr('data-price')
     const url = $this.attr('data-url')
     const quantity = parseInt($('#quantity').val())
     inBasketItemNum += quantity

     //Mise à jour du nombre de produit dans le panier
     $('#in-basket-item-num').html(inBasketItemNum)

     const newArticle = true

     //Vérifie si l'article n'est pas déjà dans le panier
     basketArticle.forEach((v) => {
          //Si l'article est déjà présent, on incrémente la quantité
          if(v.id == id){
               newArticle = false
               v.quantity += quantity
               $('#' + id).html('<a href="' + url + '">' + name + '<br> <small>Quantité : <span class="quantity">' + v.quantity + '</span></small></a>')    
          }
     })
     console.log("basketArticle", basketArticle)

     //S'il est nouveau, on l'ajoute
     if(newArticle){
          $('#cart-dropdown').prepend('<li  id="' + id + '"><a href="' + url + '">' + name +'<br><small>Quantité : <span class="quantity">' + quantity + '</span></small></a></li>')

          basketArticle.push({
               id: id,
               name: name,
               price: price,
               quantity: quantity,
               url: url
          })
     }
     //Sauvegarde le panier
     saveBasket(inBasketItemNum, basketArticle)

      //Affiche le contenu du panier si c'est le premier article
     carEmptyToggle()
} )


//Rendu de la page panier