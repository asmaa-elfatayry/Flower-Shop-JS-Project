
window.addEventListener('load',function(){
    let search_icon = this.document.querySelector(".search");
    console.log(search_icon);
      search_icon.addEventListener('click' , function(e){
        let search_input = document.querySelector(".search_input");
        search_input.classList.remove("none") ;
        search_input.classList.add("applaySearchStyle") ;
        




    });

});