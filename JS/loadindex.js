
var popularpost;
var randompost;
var latestpost=[];
var prompost;

document.addEventListener("DOMContentLoaded",function(){
    search();
    createpopularpost();
    createRandomPost();
    createLatestPost();


});

/**
 * funcion para buscar en la lista de los post y localizar todos en una sola busqueda;
 */
function search() {
    
    var dalist = JSON.parse(localStorage.getItem("postingsids"));
    var postlist=[] ;
    Object.values(dalist).forEach(ele => {
        let getingpost = localStorage.getItem(ele);
        if(getingpost==null)
            return;
        postlist.push(JSON.parse(getingpost));
    });

    if (postlist == null) return;

//identificamos si la lista contiene mas de un elemento
    if(postlist != 1){
        var better= 0;
        //realizamos la busqueda
        postlist.forEach(element => {

            //los primeros 5 post son los ultimos agregados
            if(latestpost.length <5)
                latestpost.push(element);

            //para el postrandom

            //para el post popular
            if(element.likes -(element.dislikes*0.7) >= better){
                popularpost = element;
                better=element.likes -(element.dislikes*0.7);
            }
        });
        var randnum = Math.floor(Math.random() * (latestpost.length))
        randompost=postlist[randnum];
    }
    else
    {
        popularpost=randompost = postlist;
        latestpost.push(randompost);
    }
    console.log(popularpost);
    console.log(randompost);
    console.log(latestpost);
    
}

/**
 * funcion para crear el post popular
 * @param {postObj} element 
 */
function createpopularpost(element) {

    var newpost = document.createElement("div");
    
    newpost.innerHTML = `
                        <div class="col-12"> 
                            <p id="Popular-title" name="title-shortcut" class="link-title" post-dir="${popularpost.id}"> ${popularpost.gametitle} no. cometarios / stars </p>
                        </div>

                        <div class="col-12">
                            <div class="row" >
                                <div class="col-12 col-lg-4">
                                    <img id="popular cover" src="${popularpost.gamecover}" style="width: 100%;">
                                </div> 
                                <div class="col-12 col-lg-8">
                                    <p id="popular-description" style="font-size: small;">
                                        ${popularpost.description}
                                    </p>
                                    <div class="separated">
                                        <a href="" id="popular-userposter">${JSON.parse(localStorage.getItem(popularpost.userid)).username}</a>
                                        <div id="popular-score"> ${popularpost.likes} / ${popularpost.dislikes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        newpost.classList.add("row","popular-post");
    document.getElementById("popular-post").appendChild(newpost);
}

/**
 * funcion para crear un  post aleatorio
 * @param {postObj} element 
 */
function createRandomPost() {
    let  newpost = document.createElement("div");
    newpost.innerHTML =`
                        <p id="random-game-title" name="title-shortcut" class="link-title" post-dir="${randompost.id}">${randompost.gametitle}</p>
                        <img id="random-game-cover" src="${randompost.gamecover}" style="width: 100%; "alt="">`
    newpost.classList.add("centered");
    newpost.style.padding="0px 25px"
    document.getElementById("random-post").appendChild(newpost);
}

/**
 * funcion para cargar el resto de los post
 * @param {postObj} element 
 */
function createLatestPost() {
    let tlist = document.getElementById("latest-posts");
    latestpost.forEach(epost =>{
        let newpost = document.createElement("div");
        newpost.classList.add("row","post");
        newpost.innerHTML =`
        <div class="col-12 col-lg-9" style="padding-top: 5px;">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <img src="${epost.gamecover}" style="width: 100%;"   alt="">
                    <p style="text-align: center;">por ${JSON.parse(localStorage.getItem(epost.userid)).username}</p>
                </div>
                <div class="col-12 col-lg-8">
                    <div class="row">
                        <div class="col-12 separated">
                            <h6 name="title-shortcut" class="link-title" post-dir="${epost.id}"> ${epost.gametitle}</h6>
                            <p>${"tags del juego"}</p>
                        </div>
                        <p style="font-size: small;" class="post-description">${epost.description}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-6 col-lg-3 border-left ">
            <div class="row " style="height: 75%">
                <div class="col-9 ">
                    <div style="display: inline-block;"> estrellas:${epost.likes/(epost.likes-epost.dislikes) * 5}</div>
                    <p style="text-align: right;">${0} comentarios</p>
                </div>
                <div class="col-3 " >
                    <img src="resources/windows icon.png" alt="" style="max-width: 25px; margin-bottom: 10px;">
                     <img src="resources/linux icon.png" alt="" style="max-width: 25px;">
                </div>
            </div>
            <p style="text-align: right;">created ${epost.creation_date}</p>
         </div>
        `
        tlist.appendChild(newpost);
        tlist.appendChild(document.createElement("br"));
        var jumping = document.createElement("div");
        jumping.classList.add("post-bottom");
        tlist.appendChild(jumping);
    })
    var titles = document.getElementsByName("title-shortcut");
    titles.forEach(element => {
        element.addEventListener("click",function () {
            localStorage.setItem("actualpostid",JSON.stringify(element.getAttribute("post-dir")));
            document.location="post.html";
        });
    });
}