
const Keys_posts = "pendingpost";
const gamecover = document.getElementById("game-cover")
const imgurl = document.getElementById("imgurl")

document.addEventListener("DOMContentLoaded",function(){
    loadtags();
    imgurl.addEventListener("input",loadimage)
    postingform.addEventListener("submit",savepost);
});

function loadimage() {
    gamecover.src=imgurl.value;
}

/**
 * funcion para guardar la informacion del formulario en el local storage
 * @param {evento} e 
 */
function savepost(e){
    e.preventDefault();

    var post = new postedobj("2","someoneid","dias");
    post.id = dateToKey();
    post.userid = getuser();
    post.creation_date= getDate();
    post.title = postingform["title"].value;
    post.gametitle = postingform["gametitle"].value;
    post.description = postingform["description"].value;
    post.gamecover = imgurl.value;
    post.plataforms = getPlataforms();
    post.likes=0; post.dislikes=0;

    var jsonpostingkeys = localStorage.getItem(Keys_posts);
    
    if(jsonpostingkeys==null){
        var identifiers = [];
        identifiers.push(post.id);
        var jsonpost = JSON.stringify(identifiers);
        localStorage.setItem(Keys_posts,jsonpost);
            //con la clase json hacemos string al nuevo post y lo guardamos en el localstorage
        var newpostjson = JSON.stringify(post);
        localStorage.setItem(post.id,newpostjson);
        postingform.submit();
    }
    //obtenemos los datos del localstorage y los convertimos en objetos
    var postingkeys = JSON.parse(jsonpostingkeys);
    
    //con la clase json hacemos string al nuevo post y lo guardamos en el localstorage
    var newpostjson = JSON.stringify(post);
    localStorage.setItem(post.id,newpostjson);
    //actualizamos la lista de los identificadores de los post
    postingkeys.push(post.id);
    var newpostingkeys = JSON.stringify(postingkeys);
    localStorage.setItem(Keys_posts,newpostingkeys);
    postingform.submit();
};

/**
 * funcion que toma la hora en que se preiona el boton de crear para genera una llave unica para el post
 * @returns una cadena que sera  el identificador del post
 */
function dateToKey(){
    let today = new Date();
    let keydate = "POST" + today.getDay().toString() + "-" 
                + today.getMonth().toString() + "-" 
                + today.getFullYear().toString() + "/" 
                + today.getHours().toString() + ":"
                + today.getMinutes().toString() + ":"
                + today.getSeconds  ().toString();
    return keydate;
}

/**
 * funcion para identificar que casillas de las paltaformas se sleccionarion y agregarlas a la sinformacion del post
 * @returns una arreglo de cadenas
 */
function getPlataforms(){
    let attplatforms = "optionchkbox";
    let arrtname = "platfomr"
    let nbox = document.querySelectorAll(`[${attplatforms}='${arrtname}']`)
    let names = [];
    nbox.forEach(element => { 
        if(element.checked == true) 
            names.push(element.name); });
    return names;
}
/**
 * funcion para obtener el nombre del usuario que creo el nuevo post
 * @returns nombre del usuario
 */
function getuser() {
    let user = JSON.parse(localStorage.getItem("logged"));
    if(user==null){
        console.log("bad user, false loggin")
        document.location="index.html";
        return;
    }
    return user.id;
}
/**
 * Funcion para cargar la lista de tags disponibles
 */
function loadtags() {
    let tagspace = document.getElementById("clasdiv");
    let listtag= JSON.parse(localStorage.getItem("taglist"));
    if(listtag==null)
    {
        var deflist = []
        deflist.push("uno","dos","tres","cuatro","cinco","seis","siete");
        localStorage.setItem("taglist",JSON.stringify(deflist));
    }
    let items = Object.values(listtag);

    items.forEach(element => {
        netag = document.createElement("span");
        netag.innerHTML = ` ${element}`
        netag.classList.add("tag-item");
        netag.addEventListener("click",function () { document.getElementById("tags").value += element + " "});
        tagspace.appendChild(netag);
    })
}

/**
 * funcion para transformar un objeto Date en una cadena legible
 * @returns una caden acon la fecha de creacion
 */
function getDate(){
    let today = new Date();
    let keydate = today.getDay().toString() + "/" 
                + today.getMonth().toString() + "/" 
                + today.getFullYear().toString();
    return keydate;
}