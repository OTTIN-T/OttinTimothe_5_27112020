/* JS */
// comportement du panier au survol pour affichage de son contenu
var timeout;

$('#cart').on({
    mouseenter: function() {
        $('#cart-dropdown').show();
    },
    mouseleave: function() {
        timeout = setTimeout(function() {
            $('#cart-dropdown').hide();
        }, 200);
    }
});

// laisse le contenu ouvert à son survol
// le cache quand la souris sort
$('#cart-dropdown').on({
    mouseenter: function() {
        clearTimeout(timeout);
    },
    mouseleave: function() {
        $('#cart-dropdown').hide();
    }
});

//getCookie

function setCookie(cname, cvalue, exdays) {
     var d = new Date();
     d.setTime(d.getTime() + (exdays*24*60*60*1000));
     var expires = "expires="+d.toUTCString();
 
     // règle le pb des caractères interdits
     if ('btoa' in window) {
         cvalue = btoa(cvalue);
     }
 
     document.cookie = cname + "=" + cvalue + "; " + expires+';path=/';
}

function saveCart(inCartItemsNum, cartArticles) {
     setCookie('inCartItemsNum', inCartItemsNum, 5);
     setCookie('cartArticles', JSON.stringify(cartArticles), 5);
}

function getCookie(cname) {
     var name = cname + "=";
     var ca = document.cookie.split(';');
 
     for(var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c[0] == ' ') {
             c = c.substring(1);
         }
 
         if (c.indexOf(name) != -1) {
             if ('btoa' in window) {
                  return atob(c.substring(name.length,c.length));
               } else return c.substring(name.length,c.length);
         }
     }
     return false;
}

// :Récupérer les articles et peupler le widget
// variables pour stocker le nombre d'articles et leurs noms
var inCartItemsNum;
var cartArticles;

// affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
    if (inCartItemsNum > 0) {
        $('#cart-dropdown .hidden').removeClass('hidden');
        $('#empty-cart-msg').hide();
    }

    else {
        $('#cart-dropdown .go-to-cart').addClass('hidden');
        $('#empty-cart-msg').show();
    }
}

// récupère les informations stockées dans les cookies
inCartItemsNum = parseInt(getCookie('inCartItemsNum') ? getCookie('inCartItemsNum') : 0);
cartArticles = getCookie('cartArticles') ? JSON.parse(getCookie('cartArticles')) : [];

cartEmptyToggle();

// affiche le nombre d'article du panier dans le widget
$('#in-cart-items-num').html(inCartItemsNum);

// hydrate le panier
var items = '';
cartArticles.forEach(function(v) {
   items += '<li id="'+ v.id +'"><a href="'+ v.url +'">'+ v.name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a></li>';
});

$('#cart-dropdown').prepend(items);

//Ajout d’un article au panier
// click bouton ajout panier
$('.add-to-cart').click(function() {

     // récupération des infos du produit
     var $this = $(this);
     var id = $this.attr('data-id');
     var name = $this.attr('data-name');
     var price = $this.attr('data-price');
     var url = $this.attr('data-url');
     var qt = parseInt($('#qt').val());
     inCartItemsNum += qt;
 
     // mise à jour du nombre de produit dans le widget
     $('#in-cart-items-num').html(inCartItemsNum);
 
     var newArticle = true;
 
     // vérifie si l'article est pas déjà dans le panier
     cartArticles.forEach(function(v) {
         // si l'article est déjà présent, on incrémente la quantité
         if (v.id == id) {
             newArticle = false;
             v.qt += qt;
             $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
         }
     });
 
     // s'il est nouveau, on l'ajoute
     if (newArticle) {
         $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');
 
         cartArticles.push({
             id: id,
             name: name,
             price: price,
             qt: qt,
             url: url
         });
     }
 
     // sauvegarde le panier
     saveCart(inCartItemsNum, cartArticles);
 
     // affiche le contenu du panier si c'est le premier article
     cartEmptyToggle();
});

// Rendu de la page panier
// si on est sur la page ayant pour url monsite.fr/panier/
if (window.location.pathname == '/panier/') {
     var items = '';
     var subTotal = 0;
     var total;
 
 
     /* on parcourt notre array et on créé les lignes du tableau pour nos articles :
     * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
     * - son prix
     * - la dernière colonne permet de modifier la quantité et de supprimer l'article
     *
     * On met aussi à jour le sous total et le poids total de la commande
     */
     cartArticles.forEach(function(v) {
         // opération sur un entier pour éviter les problèmes d'arrondis
         var itemPrice = v.price.replace(',', '.') * 1000;
         items += '<tr data-id="'+ v.id +'">\
              <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
              <td>'+ v.price +'€</td>\
              <td><span class="qt">'+ v.qt +'</span> <span class="qt-minus">–</span> <span class="qt-plus">+</span> \
              <a class="delete-item">Supprimer</a></td></tr>';
         subTotal += v.price.replace(',', '.') * v.qt;
     });
 
     // on reconverti notre résultat en décimal
     subTotal = subTotal / 1000;
 
     // On insère le contenu du tableau et le sous total
     $('#cart-tablebody').empty().html(items);
     $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
 
     // lorsqu'on clique sur le "+" du panier
     $('.qt-plus').on('click', function() {
         var $this = $(this);
 
         // récupère la quantité actuelle et l'id de l'article
         var qt = parseInt($this.prevAll('.qt').html());
         var id = $this.parent().parent().attr('data-id');
 
         // met à jour la quantité et le poids
         inCartItemsNum += 1;
         $this.prevAll('.qt').html(qt + 1);
         $('#in-cart-items-num').html(inCartItemsNum);
         $('#'+ id + ' .qt').html(qt + 1);
 
         // met à jour cartArticles
         cartArticles.forEach(function(v) {
             // on incrémente la qt
             if (v.id == id) {
                 v.qt += 1;
 
                 // récupération du prix
                 // on effectue tous les calculs sur des entiers
                 subTotal = ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
             }
         });
 
         // met à jour la quantité du widget et sauvegarde le panier
         $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
         saveCart(inCartItemsNum, cartArticles);
     });
 
     // quantité -
     $('.qt-minus').click(function() {
         var $this = $(this);
         var qt = parseInt($this.prevAll('.qt').html());
         var id = $this.parent().parent().attr('data-id');
 
         if (qt > 1) {
             // maj qt
             inCartItemsNum -= 1;
             $this.prevAll('.qt').html(qt - 1);
             $('#in-cart-items-num').html(inCartItemsNum);
             $('#'+ id + ' .qt').html(qt - 1);
 
             cartArticles.forEach(function(v) {
                 // on décrémente la qt
                 if (v.id == id) {
                     v.qt -= 1;
 
                     // récupération du prix
                     // on effectue tous les calculs sur des entiers
                     subTotal = ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
                 }
             });
 
             $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
             saveCart(inCartItemsNum, cartArticles);
         }
     });
 
     // suppression d'un article
     $('.delete-item').click(function() {
         var $this = $(this);
         var qt = parseInt($this.prevAll('.qt').html());
         var id = $this.parent().parent().attr('data-id');
         var arrayId = 0;
         var price;
 
         // maj qt
         inCartItemsNum -= qt;
         $('#in-cart-items-num').html(inCartItemsNum);
 
         // supprime l'item du DOM
         $this.parent().parent().hide(600);
         $('#'+ id).remove();
 
         cartArticles.forEach(function(v) {
             // on récupère l'id de l'article dans l'array
             if (v.id == id) {
                 // on met à jour le sous total et retire l'article de l'array
                 // as usual, calcul sur des entiers
                 var itemPrice = v.price.replace(',', '.') * 1000;
                 subTotal -= (itemPrice * qt) / 1000;
                 cartArticles.splice(arrayId, 1);
 
                 return false;
             }
 
             arrayId++;
         });
 
         $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
         saveCart(inCartItemsNum, cartArticles);
         cartEmptyToggle();
     });
}


//Appel de notre API
// if(search_params) {
//      const id = search_params
//      fetch("http://localhost:3000/api/cameras" + id) //Rappel notre api + l'id de notre produit
//      .then(result => result.json()) //Récupère le tableau json 
//      .catch((error) => {
//          console.log(error);
//      })
// }

// comportement du panier au survol pour affichage de son contenu
let timeout

$('#cart').on({
     mouseenter: function() {
         $('#cart-dropdown').show();
     },
     mouseleave: function() {
         timeout = setTimeout(function() {
             $('#cart-dropdown').hide();
         }, 200); //nous permet de gérer le cas où la liste n’est pas directement accolée au p avec un petit temp de latence
     }
});

// laisse le contenu ouvert à son survol
$('#cart-dropdown').on({
     mouseenter: function() {
         clearTimeout(timeout);
     },
     mouseleave: function() { //Le cache quand la souris sort
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
     document.cookie = cookieName + "=" + cookieValue + ";" + cookieExpire + ';path=/'
}
//Sauvegarder notre panier
const saveBasket = (inBasketItemNum, basketArticle) => {
     setCookies('inBasketItemNum', inBasketItemNum, 5)//cookieName cookieValue cookieExpiration
     setCookies('basketArticle', JSON.stringify(basketArticle), 5)
}


//Récupérer les cookies
let getCookies = (cookieName) => { //prend en paramètre le nom du cookie et retourne sa valeur
     const name = cookieName + "="
     const ca = document.cookie.split(';')
     console.log("ca", ca)

     for(var i = 0; i < ca.length; i++){      
          let c = ca[i]
          while(c[0] == ' '){
               c = c.substring(1)
          }

          if(c.indexOf(name) != -1){ // != Renvoie true si les opérandes sont différents.
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
let inBasketItemNum
console.log("inBasketItemNum2", inBasketItemNum)
let basketArticle
console.log("basketArticle2", basketArticle)

// affiche/cache les éléments du panier selon s'il contient des produits
let carEmptyToggle = () => {
     if(inBasketItemNum > 0){
          $('#cart-dropdown .hidden').removeClass('hidden')
          $('#empty-cart-msg').hide()
     } else{
          $('#cart-dropdown .go-to-cart').addClass('hidden')
          $('#empty-cart-msg').show()
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
console.log("carEmptyToggle2", carEmptyToggle())

//Affiche le nombre d'article du panier dans le widget
$('#in-basket-item-num').html(inBasketItemNum)

const items = ''
basketArticle.forEach((v) => {
     items += '<li id="'+ v.id +'"><a href="'+ v.url +'">'+ v.name +'<br><small>Quantité : <span class="quantity">'+ v.quantity +'</span></small></a></li>'
})
console.log("items", items)

//Insère un jeu d'objets Node (noeud) ou DOMString (chaîne de caractères) avant le premier enfant de ParentNode
$('#cart-dropdown').prepend(items)

//Ajout d’un article au panier

//Click bouton ajout panier
$('.add-to-cart').click(() => {
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
               $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="quantity">'+ v.quantity +'</span></small></a>')    
          }
     })
     console.log("basketArticle3", basketArticle)

     //S'il est nouveau, on l'ajoute
     if(newArticle){
          $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="quantity">'+ quantity +'</span></small></a></li>')
          
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
     console.log("saveBasket2", saveBasket)
      //Affiche le contenu du panier si c'est le premier article
     carEmptyToggle()
})

//Rendu de la page panier
//L’ordinateur exécute ses calculs en base 2, chaque nombre se voit attribuer un espace mémoire fini

//Si on est sur la page contenant /panier/ dans l'url
if(window.location.pathname == '/panier.html/'){
     const items = ''
     const subTotal = 0
     total

    /* on parcourt notre tableau et on créé les lignes du tableau pour nos articles :
    * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
    * - son prix
    * - la dernière colonne permet de modifier la quantité et de supprimer l'article
    *
    * On met aussi à jour le sous total de la commande
    */

   basketArticle.forEach((v) => {
        //Opération sur un entier pour éviter les problèmes d'arrondis
        const itemPrice = v.price.replace(',', '.') * 1000
        items += '<tr data-id="'+ v.id +'">\
               <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
               <td>'+ v.price +'€</td>\
               <td><span class="quantity">'+ v.quantity +'</span> <span class="quantity-minus">-</span> <span class="quantity-plus">+</span>\
               <a class="delete-item">Spprimer</a></td></tr>'
        subTotal += v.price.replace(',', '.') * v.quantity
   })

     //On reconverti notre résultat en décimal
     subTotal = subTotal / 1000

     //On insère le contenu du tableau et le sous total
     $('#cart-tablebody').empty().html(items)
     $('.subtotal').html(subTotal.toFixed(2).replace('.', ','))//toFixed permet de formater un nombre en notation à point-fixe.

     //Lorsqu'on clique sur le "+" du panier
     $('.quantity-plus').on('click', () => {
          const $this = $(this)

          //On récupère la quantité actuelle et l'id de l'article
          const quantity = parseInt($this.prevAll('.quantity').html())
          const id = $this.parent().parent().attr('data-id')

          //Met à jour la quantité
          inBasketItemNum += 1
          $this.prevAll('.quantity').html(quantity + 1)
          $('#in-basket-item-num').html(inBasketItemNum)
          $('#' + id + ' .quantity').html(quantity + 1)

          //Met à jour cartArticles
          basketArticle.forEach((v) => {
               //On incrémente la quantité
               if(v.id == id){
                    v.quantity += 1
                    // récupération du prix
                    // on effectue tous les calculs sur des entiers   
                    subTotal =  ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000
                    //parseFloat() permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci
               }
          })

          //Met à jour la quantité du panier et sauvegarde le panier
          $('.subtotal').html(subTotal.toFixed(2).replace('.', ','))
          saveBasket(inBasketItemNum, basketArticle)
          console.log("saveBasket3", saveBasket)
     })

     //Lorsqu'on clique sur le "-" du panier
     $('.quantity-minus').click(() => {
          const $this = $(this)
          const quantity = parseInt($this.prevAll('.quantity').html())
          const id = $this.parent().parent().attr('data-id')

          if(quantity > 1){  
               //Mise à jour de quantity
               inBasketItemNum -= 1
               $this.prevAll('.quantity').html(quantity - 1)
               $('#in-basket-item-num').html(inBasketItemNum)
               $('#' + id + ' .quantity').html(quantity - 1 )

               basketArticle.forEach((v) => {
                    //On incrémente la quantité
                    if(v.id == id){
                         v.quantity -= 1
                         // récupération du prix
                         // on effectue tous les calculs sur des entiers   
                         subTotal =  ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000
                         //parseFloat() permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci
                    }
               })
               //Met à jour la quantité du panier et sauvegarde le panier
               $('.subtotal').html(subTotal.toFixed(2).replace('.', ','))
               saveBasket(inBasketItemNum, basketArticle)
          }
     })

     //Suppression d'un article
     $('.delete-item').click(() => {
          const $this = $(this)
          const quantity = parseInt($this.prevAll('.quantity').html())
          const id = $this.parent().parent().attr('data-id')
          const arrayId = 0
          price

          //Mise à jour de quantity
          inBasketItemNum -= quantity
          $('#in-basket-item-num').html(inBasketItemNum)

          //Supprime l'item du DOM
          $this.parent().parent().hide(600)
          $('#' + id).remove()

          basketArticle.forEach((v) => {
               //On récupère l'id de l'article dans l'array
               if(v.id == id){
                    //On met à jour le sous total et retire l'article de l'array
                    //calcul sur des entiers
                    const itemPrice = v.price.replace(',', '.') * 1000
                    subTotal -= (itemPrice * quantity) / 1000
                    basketArticle.splice(arrayId, 1)
                    //splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.
                    return false
               }

               arrayId++
          })

          $('.subtotal').html(subTotal.toFixed(2).replace('.', ','))
          saveBasket(inBasketItemNum, basketArticle)
          carEmptyToggle()
     })
}

