if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('./sw.js')
        .then(e =>{
            console.log("Service Worker: Registered");
        })
        .catch((e)=>{
            console.log("Service Worker: Failed To Register");
        })
}


// Navbar 
let menu=document.querySelectorAll('.nav-menu a');
menu.forEach(element => {
    element.onclick=(e)=>{
        menu.forEach(element =>{
            let targetClass = element.getAttribute('data-toggle');
            let target = document.querySelector(`.${targetClass}`);
            target.classList.remove('show');
        })
        let targetClass = e.target.getAttribute('data-toggle');
        let target = document.querySelector(`.${targetClass}`);
        target.classList.add('show');
    }
});