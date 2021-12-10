
const pendings = "pendingpost";
const aprovedlist = "postingsids";

document.addEventListener("DOMContentLoaded",function(){
    loadpostpending();
});

/**
 * funcion para cargar los post que estan pendientes de aprovacion
 * @returns nada, solo interumpe le proceso
 */
function loadpostpending() {
    document.getElementById("post-for-aproval").innerHTML=``;
    var postlist = JSON.parse(localStorage.getItem(pendings));
    if (postlist==null)
        return;
    postlist.forEach(elepost => {
        let element = JSON.parse(localStorage.getItem(elepost))
        var  anpost=document.createElement("div");
        anpost.classList.add("row","post");
        
        anpost.innerHTML=`
        <div class="col-12">
            <button id="aprovebtn" parent-post="${element.id}" name="choice">aprovar</button> <button id="deletebtn" parent-post="${element.id}" name="choice">Borrar</button>
        </div>
        <div class="col-12"> 
            <p>Nombre del post: ${element.title} </p>
            <p>Nombre del juego: ${element.gametitle} </p>
        </div>
        <div class="col-12">
            <div class="row" >
                <div class="col-12 col-lg-4">
                    game cover
                    <img src="${element.gamecover}" style="width: 100%;">
                </div> 
                <div class="col-12 col-lg-8">
                   <p style="font-size: large;"> ${element.description}
                    </p>                                                    
                </div>
            </div>
        </div>
        <div class="col-12" style="padding-bottom:15px">
            propuesto por: ${JSON.parse(localStorage.getItem(element.userid)).username} <br>
            <img src="${JSON.parse(localStorage.getItem(element.userid)).img}" name="lat-post-img" style=" width: 100%;max-width:100px">
            el dia ${element.creation_date}
            <br>
        </div>`
        document.getElementById("post-for-aproval").appendChild(anpost);

    });
    let btns = document.getElementsByName("choice");
    btns.forEach(element=>{
        if(element.id == "deletebtn")
            element.addEventListener("click",function (params) {
             eliminar(element.getAttribute("parent-post"));   
            });
        if(element.id == "aprovebtn")
            element.addEventListener("click",function (params) {
                aprove(element.getAttribute("parent-post"));   
            });
    })

}

/**
 * funcion para eliminar o rechazr post propuestos, recibe  una cadena que es el identificador del post
 * @param {string} targetpost 
 */
function eliminar(targetpost) {
    let lista = JSON.parse(localStorage.getItem(pendings));
    let point = lista.indexOf(targetpost);
    lista.splice(point,1);
    localStorage.setItem(pendings,JSON.stringify(lista));
    loadpostpending();
}

/**
 * funcion para agregar un post a la lista de post aprovados que puede ser visible, se retirara de la lista  de pendientes
 * @param {string} targestpost 
 */
function aprove(targestpost) {
    let lista = JSON.parse(localStorage.getItem(aprovedlist));
    if(lista == null){
        var initial=[];
        initial.push(targestpost);
        lista=initial;
    }
    else
        lista.push(targestpost);
    localStorage.setItem(aprovedlist,JSON.stringify(lista));
    eliminar(targestpost);
}