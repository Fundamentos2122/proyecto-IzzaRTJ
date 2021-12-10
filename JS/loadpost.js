
var actual;
var actualuser;
const Keys_posts = "postingsids";


/** 
 * obtener id del post
 * crear post
 * leer lista de comentarios del post
 * crear los cuadros de comentarios
 */

document.addEventListener("DOMContentLoaded",function(){
    let postid = JSON.parse(localStorage.getItem("actualpostid"));
    actual = JSON.parse(localStorage.getItem(postid));
    actualuser = JSON.parse(localStorage.getItem("logged"));
    loaduserforcomment();

    if(actual==null) {
        //alert("no existe el post");
        let alternative = JSON.parse(localStorage.getItem("postingsids"));
        if(alternative==null)
            return;
        alert("no existe el post, mostrando ultimo post")
        actual = JSON.parse(localStorage.getItem(alternative[0]));
    }else{
        console.log(actual);
    }
    
    
    fillpost();
    document.forms["commentform"].addEventListener("submit",savecomment);
    loadcomments();

});

/**
 * funcion para cargar la informacion principal  del  post
 */
function fillpost() {
    document.getElementById("game-cover").src=actual.gamecover;
    document.getElementById("game-title").innerHTML=actual.gametitle;
    document.getElementById("game-plataforms");
    document.getElementById("game-genre");
    document.getElementById("game-score");
    document.getElementById("game-tags");
    document.getElementById("game-description").innerHTML=actual.description;
    document.getElementById("game-screens");
    let postuser = JSON.parse(localStorage.getItem(actual.userid));
    document.getElementById("userimg").src=postuser.img;
    document.getElementById("username").innerHTML=postuser.username;
}

/**
 * funcion para cargar los comentarios hechos en el  post
 * @returns nada solo detiene la funcion en caso de que la lista de comentarios este vacia
 */
function loadcomments() {
    var comentaries = document.getElementById("commentary-list");
    if(actual.ccoments_id == null)
        return;
    actual.ccoments_id.forEach(element => {
        acomment=document.createElement("div");
        acomment.classList.add("row","post",);
        acomment.innerHTML=`
        <div class="col-4 col-lg-2" style=" align-content: center;">
            <img src="${JSON.parse(localStorage.getItem(element.userid)).img}" style="width: 100%;">
            <h6>${JSON.parse(localStorage.getItem(element.userid)).username}</h6>
        </div>
        <div class="col-8 col-lg-9">
            <p>${element.creation_date}</p>
            <p> ${element.content} </p>
        </div>
        `
        comentaries.appendChild(acomment);
        comentaries.appendChild(document.createElement("br"));
    });
}

/**
 * 
 * @returns funcion para cargar  la imagen de perfil del usuario y su nombre
 */
function loaduserforcomment(){
    if(actualuser.rank == "nouser")
        return;
    document.getElementById("userbox-img").src = actualuser.img;
    document.getElementById("userbox-username").innerHTML = actualuser.username;
}

/**
 * funcion que guardara un nuevo comentario en la lista de comentarios del post actual
 * @param {event} e 
 */
function savecomment(e) {
    e.preventDefault();
    var formulary=  document.forms["commentform"];
    var nextcomment = new comentobj();
    nextcomment.content=formulary["text-comment"].value;
    nextcomment.id = 1231;
    nextcomment.userid =  actualuser.id;
    nextcomment.creation_date = Date.now();
    nextcomment.likes = nextcomment.dislikes = 0;
    nextcomment.parentpost = actual.id;
    if(actual.ccoments_id==null){
        let temparrcoments = [];
        temparrcoments.push(nextcomment);
        actual.ccoments_id = temparrcoments;
    }
    else
        actual.ccoments_id.push(nextcomment);
    //console.log(nextcomment);
    localStorage.setItem(actual.id,JSON.stringify(actual));

    let latestcomments = JSON.parse(localStorage.getItem("latestcomments"));
    if(latestcomments==null){
            var identifiers =[];
            identifiers.push(nextcomment);
            localStorage.setItem("latestcomments",JSON.stringify(identifiers));
    }else{
        //cuando solo hay un comentario
        let finalcomments=[];
        let cont=0;
        latestcomments.forEach(element => {
            if(cont >= 4)
                return;
            finalcomments.push(element);
            cont++;
        });
        finalcomments.unshift(nextcomment);
        console.log(finalcomments);
        localStorage.setItem("latestcomments",JSON.stringify(finalcomments));
    } 
        

    document.forms["commentform"].submit();
}