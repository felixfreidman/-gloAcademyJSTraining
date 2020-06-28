$(document).ready(function() {
    const mobileMenuButton = $(".mob-menu-button");
    const mobileMenu = $('.desktop-group');
    const tab = $('.tab');
    mobileMenuButton.on('click', () => {
        mobileMenu.toggleClass('active-menu');
        $('body').toggleClass('no-scroll');
    });

    tab.on("click", function() {
        tab.removeClass('active');
        $(this).toggleClass('active');
        let activeTabContent = $(this).attr('data-target');
        $('.tabs-content').removeClass('visible');
        $(activeTabContent).toggleClass('visible');
    });
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        slidesPerView: 4,
        spaceBetween: 25,
        breakpoints: {

            992: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1,
                navigation: {
                    nextEl: ".button-next"
                }
            }

        }
    });


});