
/**
 * en este archivo esta el codigo para cargar los ultimos comentrios en el sitio
 */
document.addEventListener("DOMContentLoaded",function(){

    var comentarylist = JSON.parse(localStorage.getItem("latestcomments"));
    if(comentarylist==null)
        return;
    let barlist = document.getElementById("latest-post-bar");
    comentarylist.forEach(element => {
        let commentary = document.createElement("div");
        commentary.classList.add("row","latest-post",);
        commentary.innerHTML=`
        <div class="col-12 centered">
            <h6>${JSON.parse(localStorage.getItem(element.parentpost)).gametitle}</h6>
        </div>
        <div class="col-4 col-lg-10 centered" >
            <img src="${JSON.parse(localStorage.getItem(element.userid)).img }" alt="" name="lat-post-img" style=" width: 100%;max-width:100px">
        </div>
        
        <div class="col-8">
            <h6 class="border-bottom"></h6>
            <p style="margin-bottom:0%">${element.content}</p>
        </div> 
        `
        commentary.addEventListener("click",function () {
            localStorage.setItem("actualpostid",JSON.stringify(element.parentpost));
            document.location="posts.html"
        })
        barlist.appendChild(commentary);
        barlist.appendChild(document.createElement("br"));
    });


});