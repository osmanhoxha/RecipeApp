

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

gsap.defaults({
        ease:'power2.inOut',
        duration: 1
})

var tl = gsap.timeline();

tl.from('.img1', {x: 600}).from('.img2', {x: 600},'-=0.9')
.from('.img3', {x: 600}, '-=0.9')
.from('.img4', {x: 600},'-=0.9')
.from('.img5', {x: 600},'-=0.9')
.from('.img6', {x: 600},'-=0.9')
.from('.img7', {x: 600},'-=0.9')
.from('.img8', {x: 600},'-=0.9')
.fromTo('.home-txt',{x:-730},{x:-55, duration: 1},'-=0.5')
.fromTo('.desc',{y:-100, opacity: 0},{y: 0 , opacity: 1, duration:1.5})
.to('.img1',{y:120},'-=1')
.to('.img2',{y:85},'-=1')
.to('.img3',{y:50},'-=1')
.to('.img4',{y:20},'-=1')
.to('.img6',{y:-20},'-=1')
.to('.img7',{y:-50},'-=1')
.to('.img8',{y:-70},'-=1');



