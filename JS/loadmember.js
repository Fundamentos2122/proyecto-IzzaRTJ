
var list_elements;

function searchforelements(n){
    list_elements = document.getElementsByName("n");

    list_elements.forEach(element => { 
        element.style.display = "block";
    });
    
}