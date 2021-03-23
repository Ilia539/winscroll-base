let wrapper = document.querySelector('.wrapper');

const pageSlider = new Swiper('.page',{
    // свои классы цепляю
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    // вертикальный слайдер вкл.
    direction: 'vertical',
    // кол-во слайдов для показа
    slidesPerView: 'auto',
    // вкл. параллакс
    parallax: true,
    // управление клавой 
     keyboard: {
        //  вкл. выкл.
    enabled: true,
    // вкл. выкл только когда слайдер в пределах вьюпорта
    onlyInViewport: true,
    // вкл.выкл упр клавишами pageUp b pageDown
    pageUpDown: true,
  },
//   управл колесом мыши
mousewheel: {
    // чувствительность
    sensitivity: 1,
    // класс обьекта на котором срабатывает прокрутка
    // eventsTarget: ".image-slider"
  },
//   откл функционала если слайдов меньше чем надо
watchOverflow: true,
// скорость 
speed: 850,
// обновить свайпер при изменении элементов слайдера
observer: true,
// обновит  свайпер при изменен родительских элементов слайдера
observeParents: true,
//  обновит  свайпер при изменен дочерних элементов слайдера
observeSlideChildren: true,
// Навигация буллеты, текущее положение, прогрессбар
pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: "page__bullet",
    bulletActiveClass: "page__bullet_active",
  },
//   скроллбар кастомный
scrollbar: {
    el: '.page__scroll',
    dragClass: "page__drag-scroll",
    // возможность перетаскивать скрол
    draggable: true,
  },
//   откл автоинициализацию 
init: false,
//   События
on: {
    // событие инициализации
    init: function () {
        menuSlider();
        setScrollType();
        wrapper.classList.add('_loaded');
      
    },
    // событие смены слайда
    slideChange: function () {
        menuSliderRemove();
        menuLinks[pageSlider.realIndex].classList.add('_active');
      
    },
    resize: function () {
        setScrollType();
    }
  },
});

// работаем с меню можно использ как пл скролл
let menuLinks = document.querySelectorAll('.menu__link');
function menuSlider() {
    if (menuLinks.length > 0){
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", function (e) {
                menuSliderRemove ();
                pageSlider.slideTo(index, 800);
                 menuLinks.classList.add('_active');
                e.preventDefault();
            });
        }
    }
}
// чтоб работал только нажатая ссылка
function menuSliderRemove() {
    let menuLinkActive = document.querySelector('.menu__link._active');
    if (menuLinkActive){
        menuLinkActive.classList.remove('_active');
    }

}
// функция чтоб убирать точки при увеличении контента
function setScrollType() {
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }
    for (let index = 0; index < pageSlider.slides.length; index++) {
            const pageSlide = pageSlider.slides[index];
            const pageSlideContent = pageSlide.querySelector('.screen__content');
            if (pageSlideContent) {
                const pageSlideContentHeight = pageSlideContent.offsetHeight;
                if (pageSlideContentHeight > window.innerHeight) {
                    wrapper.classList.add('_free');
                    pageSlider.params.freeMode = true;
                    break;
                }
            }
            
        }
    

}

// запускаем вручную
pageSlider.init();