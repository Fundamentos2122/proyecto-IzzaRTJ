const navspace = "navspace";
const bannerspace = "bannerspace";
const logged = "logged";
const nav_bar = document.createElement("div");
const ban_bar = document.createElement("div");

class OBJidentificator {
    OBJidentificator(){};
    id;
    userid;
    creation_date;
}


class UserObj{
    UserObj(){};
    id;
    password;
    img;
    username;
    title;
    rank;
    setDefault() {
        this.id="000"; this.username="visit";this.rank="nouser";this.title="visit";
    }
}

class postedobj extends OBJidentificator {
    postedobj(){};
    title;
    gametitle;
    description;
    gamecover;
    files;
    plataforms;
    likes; dislikes;
    tags;
    comments=[];
};

class comentobj extends OBJidentificator {
    comentobj(){};
    content;
    parentpost;
    likes; dislikes;
}


class userlist{
    userlist(d){}
    username;
    id;
}

nav_bar.className = "row top-bar";
ban_bar.className = "row";
nav_bar.innerHTML=`
        <div class="col-1 col-lg-3">        
            <div class="browser-nav-bar">
                <a href="index.html">Inicio</a> |
                <a href="post.html">Post</a> |
                <a href="gallery.html">Galeria</a> |
                <a href="faqs.html">FAQ's</a>
            </div>
            <div>
                <img src="/resources/menu icon.png" class="movil-nav-icon" id="movil-nav-menu" style="width: 20px;">
                <div class="centered nav-menu hide" id="movilmenu" >
                    <div class="bagmenu" name="bgmenu"> </div>
                    <div class="nav-menu" style="position:fixed ">
                        <a href="index.html">Inicio</a>
                        <a href="post.html">Post</a>
                        <a href="gallery.html">Galeria</a>
                        <a href="faqs.html">FAQ's</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-9 col-lg-8" >
            <form id="search-bar">
                <input type="text" class="searchbox">
                <img src="/resources/search icon.png" style="width: 20px;">
            </form>
        </div>
        <div class="col-1 centered">
            <button class="hide" user-rank="nouser" name="loginobject" id="loginbtn" onclick="location.href='login.html'">Login</button>
            <button class="hide" user-rank="user" name="loginobject" id="userbtn" style="padding:0px; background-color="none"> <img id="loggeduserimg"src="resources/img icon color.png" alt="" class="icon"></button>
            <div class="centered nav-menu hide" id="usermenu" style="position:absolute">
                <div class="bagmenu" name="bgmenu"> </div>
                <button id="logoutbtn" onclick="location.href='index.html'">Salir</button>
                <button user-rank="user" name="loginobject" onclick="location.href='post-creation-form.html'">Crear</button>
                <button user-rank="mod" name="loginobject" onclick="location.href='moderator.html'">Moderar</button>
                <button class="hide" user-rank="admin" name="loginobject">Administrar</button>
            </div>
        </div>
`

ban_bar.innerHTML =`
        <div class="col-12 col-lg-9 movilpadding">
            <img src="resources/banner.jpg" class="banner-img" >
        </div>
        <div class="col-1 col-lg-3" id="music-bar">
            <div style="background-color:violet;">
                <img src="/resources/music icon.png" class="movil-nav-icon" >
            </div>
            <div class="row browser-nav-bar">
                <div class="col-12">
                    <img src="resources/covers.png" style="width:250px;" alt="">
                </div>
                <br>
                <div class="col-6">
                    <button name="btn-player"><</button>
                    <button name="btn-player">P</button>
                    <button name="btn-player">></button>
                </div>
                <div class="col-6">
                    <button>o<|</button> ---
                </div>
            </div>
        </div>`

document.getElementById(navspace).appendChild(nav_bar);
document.getElementById(bannerspace).appendChild(ban_bar);

const loginobject = "loginobject";
const permisson = {"user":1,"mod":2,"admin":3};

document.addEventListener("DOMContentLoaded",function(){
    
    document.getElementById("userbtn").addEventListener("click",function(){
        let menu = document.getElementById("usermenu");
        menu.classList.remove("hide");
        menu.classList.add("show");
    }) 
    document.getElementById("movil-nav-menu").addEventListener("click",function(){
        changedisplay(document.getElementById("movilmenu"));
    })
    identifyuser();
    var bagmenus= document.getElementsByName("bgmenu");
    bagmenus.forEach(element => {
        element.addEventListener("click",function(){
            changedisplay(element.parentElement)});
    })

    document.getElementById("logoutbtn").addEventListener("click",Logout);
    
})

/**
 * funcion para identificar al usuario y remover las opciones a las que no tiene acceso
 */
function identifyuser(){
    
    if(localStorage.getItem(logged) == null){
        let defuser = new UserObj();
        defuser.setDefault();
        localStorage.setItem(logged,JSON.stringify(defuser));
    }

    let jsonlog = localStorage.getItem(logged);
    let loguser = JSON.parse(jsonlog);
    let urank = loguser.rank;

    //obtenemos la imagen del perfil del usuario
    document.getElementById("loggeduserimg").src=loguser.img;

    //buscamos todos los objetos con nombre loginobject y se mostraran segun los permisos de usuario
    var objs = document.getElementsByName(loginobject);
    if(urank == "nouser" || urank=="")
        objs.forEach(element => { if(element.getAttribute("user-rank") == "nouser") element.classList.add("show"); });
    else
        objs.forEach(element => { 
            if(permisson[element.getAttribute("user-rank")] <= permisson[urank])
            {
                element.classList.add("show"); 
            } 
                
        });
}

/**
 * funcion para cambiar la  visibilidad de un elemento
 * @param {*} element 
 */
function changedisplay(element){
    if(element.classList.contains("hide")) {
        element.classList.remove("hide")
        element.classList.add("show")
    }
    else
    {
        element.classList.remove("show")
        element.classList.add("hide")
    }
}

/**
 * funcion para cerrar sesion de un usuario
 */
function Logout() {
    let nonuser = new  UserObj();
    nonuser.setDefault();
    localStorage.setItem("logged",JSON.stringify(nonuser));
}