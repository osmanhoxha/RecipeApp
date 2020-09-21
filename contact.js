const header = document.querySelector('header');
const links = document.querySelectorAll('.link')


window.addEventListener('scroll', ()=>{
    header.classList.toggle('change',window.scrollY > 1);
    for(let i=0; i<links.length; i++){
        links[i].classList.toggle('diff', window.scrollY>1);
    }
});


const dark = document.querySelector('.darkMode');

let darkMode = localStorage.getItem('darkMode'); 

const enableDarkMode = () => {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
        enableDarkMode();
}

dark.addEventListener('click', ()=>{
        darkMode = localStorage.getItem('darkMode'); 
        if (darkMode !== 'enabled') {
          enableDarkMode();
        } else {  
          disableDarkMode(); 
        }
});

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');



menu.addEventListener('click', ()=>{
    header.classList.toggle('act');
    nav.classList.toggle('active');
})