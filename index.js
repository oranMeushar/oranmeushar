
const homeText = document.querySelector('.home-small');
const homeNav = document.querySelector('.home-nav');
const homeNavLi = [...document.querySelectorAll('.home-nav li')];


const pageNave = document.querySelector('.page-nav');
const pageNaveButton = document.querySelector('.page-nav-button');
const pageNaveUl = document.querySelector('.page-nav ul');
const lines = [...document.querySelectorAll('.page-nav-button .line')];


const borderHorizontal = [...document.querySelectorAll('.border-horizontal')];
const borderVertical = [...document.querySelectorAll('.border-vertical')];

const bees = [...document.querySelectorAll('.bee-wrapper')];
const ants = [...document.querySelectorAll('.ant')];
const birds = [...document.querySelectorAll('.project')];


const cardWrapper = [...document.querySelectorAll('.modal-card-wrapper')];


let aboutPosition =  document.querySelector('.about').getBoundingClientRect().top + window.pageYOffset;
let skillsPosition =  document.querySelector('.skills').getBoundingClientRect().top + window.pageYOffset;

let openDelay = 0
let closeDelay = 0.1;

const text = `I am a developer`;

const animatedText = (text) =>{
    let char = null;
    let i = 0;
    setInterval(() => {
        const interval = setInterval(() =>{
            char = text.charAt(i++);
            homeText.innerHTML += char;
            if (i === text.length) {
                clearInterval(interval);
            }
        },100);
    }, 3400);
}


const unSetPageNavigation = () =>{
    homeNav.style.top = `0`;
    homeNav.style.right = `0`;
    homeNav.style.transform =`scaleX(1)`;
    homeNavLi.forEach(li => {
        li.firstElementChild.style.borderRadius = '0';
    });

    pageNave.style.transform =`scale(0)`;
    pageNave.classList.remove('active');
    pageNaveUl.classList.remove('active');

    lines.forEach(line => {
        line.classList.remove('active');
    });    
}

const setPageNavigation = () =>{
    homeNav.style.top = `15vmin`;
    homeNav.style.right = `-24vmin`;
    homeNav.style.transform =`scaleX(0)`;
    homeNavLi.forEach(li => {
        li.firstElementChild.style.borderRadius = '50%';
    });

    pageNave.style.transform =`scale(1)`;   
}

const handlePageNavClicked = () =>{
    pageNave.classList.toggle('active');
    pageNaveUl.classList.toggle('active');
    lines.forEach(line => {
        line.classList.toggle('active');
    });
}

const handleNavigation = () =>{
    if (window.pageYOffset > (window.innerHeight / 3)) {
        setPageNavigation()   
    }
    else{
        unSetPageNavigation();    
    }
}

const handleAboutBorderAnimation = () =>{
    if (window.pageYOffset >= aboutPosition -100 ) {
        borderHorizontal.forEach(border => {
            border.classList.add('active');
        });
        borderVertical.forEach(border => {
            border.classList.add('active');
        });
    }
    else{
        borderHorizontal.forEach(border => {
            border.classList.remove('active');
        });
        borderVertical.forEach(border => {
            border.classList.remove('active');
        });
    }
}

const handleSkillsboardAnimation = () =>{
    if (window.pageYOffset >= skillsPosition-50) {
        ants.forEach(ant => {
            ant.classList.add('active');
        });
    }
    else{
        ants.forEach(ant => {
            ant.classList.remove('active');
        });
    }
}

animatedText(text);

window.addEventListener('scroll',(e) =>{
    handleNavigation();
    handleAboutBorderAnimation();
    handleSkillsboardAnimation();
    
});
window.addEventListener('resize',(e) =>{
    aboutPosition =  document.querySelector('.about').getBoundingClientRect().top + window.pageYOffset;
    skillsPosition =  document.querySelector('.skills').getBoundingClientRect().top + window.pageYOffset;  
});

pageNaveButton.addEventListener('click',(e) =>{
    handlePageNavClicked()
});



birds.forEach(bird => {
    bird.addEventListener('click',(e) =>{
        const projectNumber = e.target.className.split('-')[1];
        const modal = document.querySelector(`.modal-${projectNumber}`);
        const card = document.querySelector(`.modal-card-wrapper-${projectNumber}`);
        modal.classList.add('active');
        card.classList.add('active');
    });
});

cardWrapper.forEach(card => {
    card.addEventListener('mouseenter', (e) =>{
        const covers = [...e.target.children];
        covers.forEach(cover => {
        if (cover.className.includes('card-cover')) {
            console.log(cover);
            if (openDelay > 0.1) {
                openDelay = 0;
            }
            cover.style.transition = `transform 0.6s ease ${openDelay}s`
            cover.classList.add('active'); 
            openDelay += 0.05;
        }
       }); 
    });

    card.addEventListener('mouseleave', (e) =>{
        const covers = [...e.target.children];
        covers.forEach(cover => {
        if (cover.className.includes('card-cover')) {
            if (closeDelay < 0) {
                closeDelay = 0.1;
            }
            cover.style.transition = `transform 0.6s ease ${closeDelay}s`
            cover.classList.remove('active'); 
            closeDelay -= 0.05;
        }
       }); 
    });
});


document.addEventListener('click',(e)=>{
    if(e.target.className.includes('modal') && e.target.className.includes('active')){
        const projectNumber = e.target.classList[1].split('-')[1];
        const modal = document.querySelector(`.modal-${projectNumber}`);
        const card = document.querySelector(`.modal-card-wrapper-${projectNumber}`);
        modal.classList.remove('active');
        card.classList.remove('active');
    }
});
