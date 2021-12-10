
const regis_users = "usersdb";
const rankuser = "user";
const rankmod = "mod";
const rankadmin = "admin";

const loginform = document.forms["login-form"];
const regisform = document.forms["regis-form"];

const attrtarget="data-target";
const attrtoggle="data-toggle";
const datatoggle="div"

const userDB = "user-database";
const logged = "logged";
/**
 * 
 */
class UserObj{
    UserObj(){};
    id;
    password;
    img;
    username;
    title;
    rank;
}

class userlist{
    userlist(d){}
    username;
    id;
}


document.addEventListener("DOMContentLoaded",function(){
    checkusersdata();

    let switchbtns = document.querySelectorAll(`[${attrtoggle}='${datatoggle}']`)
    switchbtns.forEach(element => { 
        element.addEventListener("click", function () {changedisplay(element);});
    });

    console.log(loginform,regisform);
    loginform.addEventListener("submit",loginuser)
    regisform.addEventListener("submit",registreUser);
})
/**
 * cambia  la visibilidad  de un objeto
 * @param {event} e 
 */
function changedisplay(e)
{

    e.parentElement.parentElement.classList.remove("show");
    e.parentElement.parentElement.classList.add("hide");

    let targetselector = e.getAttribute(attrtarget);
    console.log(targetselector);
    let targetb = document.getElementById(targetselector);
    targetb.classList.remove("hide");
    targetb.classList.add("show");
    document.getElementById("succes-div").classList.add("hide");
}

/**
 * funcion para identificar si el usuario y contrasena existen en la base de datos
 * @param {evento} e 
 * @returns nada solo detiene le proceso
 */

function loginuser(e) {
    e.preventDefault();

    let euser = loginform["username"].value;
    let  ulist = JSON.parse(localStorage.getItem(userDB));
    var con="";
    console.log("intentando loggeo");
    ulist.forEach(element => {
        if(element.username == euser)
            con = element.id;
    })
    
    if(con == ""){
            alert("usuario o contrasena incorrectos")
            
            return;
        }  
    let promuser = JSON.parse(localStorage.getItem(con))
    if(loginform["password"].value != promuser.password){
        alert("usuario o contrasena incorrectos")
        return;
    }
    localStorage.setItem("logged",JSON.stringify(promuser));
    loginform.submit();

}

/**
 * funcion para regsitrar a un usuario en la base de datos del sitio, enviiando una notificacion y borrando el formulari de registro
 * @param {event} e 
 * @returns nada
 */
function registreUser(e) {
    e.preventDefault();
    let strdb = localStorage.getItem(userDB);
    let db = JSON.parse(strdb);

    if (regisform["passwordB"].value != regisform["passwordA"].value){
        passwordwarning();
        return;
    }
    //guardar la informacion
    var id= regisform["regusername"].value + dateToKey();
    var newuser = new UserObj()
    newuser.id = id;
    newuser.username = regisform["regusername"].value;
    newuser.password = regisform["passwordA"].value;
    newuser.title = "nuevo";
    newuser.rank = rankuser;
    newuser.img = regisform["pimage"].value;
    //guardamos en lista de usuarios
    let newitem = new userlist();
    newitem.username = newuser.username;
    newitem.id = newuser.id;

    var datalist = JSON.parse(localStorage.getItem(userDB));
    datalist.push(newitem);
    localStorage.setItem(userDB,JSON.stringify(datalist));


    //guardar en bd

    var jsonuser = JSON.stringify(newuser);
    localStorage.setItem(id,jsonuser);
    document.getElementById("succes-div").classList.remove("hide");
    document.getElementById("register-div").classList.add("hide");
    document.getElementById("register-div").classList.remove("show");
    document.getElementById("login-div").classList.remove("hide");
    regisform["regusername"].value =null;
    regisform["passwordA"].value =null;
    regisform["passwordB"].value =null;
    regisform["mail"].value =null;

}

/**
 * evento que lanza un aviso si las contrasenas deregistro no coinciden
 */
function passwordwarning(params) {

    let passdiv=document.getElementById("passworddiv");
    passdiv.classList.add("warningmsg");
    let warnmsg = document.getElementById("wmsg");
    warnmsg.classList.add("show");
    
}

/**
 * funcion para convertir la fecha y hora en un identificador
 * @returns una cadena que sera el identificador del usuario
 */
function dateToKey(){
    let today = new Date();
    let keydate = "USER" + today.getDay().toString() + "-" 
                + today.getMonth().toString() + "-" 
                + today.getFullYear().toString() + "/" 
                + today.getHours().toString() + ":"
                + today.getMinutes().toString() + ":"
                + today.getSeconds  ().toString();
    console.log(keydate);
    return keydate;
}

/**
 * funcion paara detectar  si la lisata de usuarios esta vacia  o no existe, creara una de ser el ultimo caso
 */
function checkusersdata(){
    var db = localStorage.getItem(userDB);
    if(db==null){
        let first = new userlist("usuarios","identificador");
        first.username = "usuarios";
        first.id = "identificador";
        let usrlist=[];
        usrlist.push(first);
        var json = JSON.stringify(usrlist);
        localStorage.setItem(userDB,json);
    }
}