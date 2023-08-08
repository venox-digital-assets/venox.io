    /* Register Scrolltrigger Plugin */
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /* Sticky nav*/
    ScrollTrigger.matchMedia({
        "(min-width:768px)": function() {
           
            ScrollTrigger.create({
              trigger: ".nav-holder",
              endTrigger: "body",
              start: "top top", 
              end: "bottom bottom-=9999", 
              pin: true, 
              pinSpacing: false,
              id: "pin-1",
              //markers:true,
              toggleClass: {
                targets: '.nav-holder',
                className: 'sticky',
                },

            });
        }
    });

    /* Move the moon man! */
    gsap.to('.moon', {
        y: '600vh',
        ease: 'none',
        scrollTrigger: {
            id: "parallax-1",
            trigger: 'body',
            start: 'top top',
            scrub: true,
            //markers:true
        }
    });

    /* Chart reveal */
    let revealContainers = document.querySelectorAll(".reveal-holder");

    gsap.set('.go-label-bitcion', { autoAlpha: 0});
    gsap.set('.go-label-venox', { autoAlpha: 0});
    gsap.set('.go-text-venox', { autoAlpha: 0});
    gsap.set('.go-text-bitcion', { autoAlpha: 0});
    gsap.set('.go-dates li', { autoAlpha: 0});


    revealContainers.forEach(container => {
        let wrapper = container.querySelectorAll(".reveal");
        let image = container.querySelectorAll(".reveal-inner");

        var abc = $(container)[0];
        var topAttribute = abc.getAttribute("start");
        var dataDelay = abc.getAttribute("delay");
        //let topOffset = "50%";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: topAttribute,
                toggleActions:"restart none none reverse",
                //markers:true
            },
        });

        tl.set(wrapper, { autoAlpha: 1});
        

        tl.from(wrapper, 1.5, {xPercent: -100,ease: Power0.easeNone,delay:dataDelay});
        tl.from(image, 1.5, {xPercent: 100,delay: -1.5,ease: Power0.easeNone,});

        tl.to('.go-label-bitcion', 0.6, {autoAlpha: 1,ease: Power4.out,}, '-=2');
        tl.to('.go-label-venox', 0.6, {autoAlpha: 1,ease: Power4.out,}, '-=1.8');

        tl.to('.go-text-venox', 0.6, {autoAlpha: 1,ease: Power4.out}, '-=0.2');
        tl.to('.go-text-bitcion', 0.6, {autoAlpha: 1,ease: Power4.out}, '-=0.4');

        tl.to(".go-dates li", 0.6, {autoAlpha: 1,stagger: 0.5, ease: Power4.out}, '-=2.2');

      

    });



    /* Smooth scroll to section */
    $('.nav-item a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 101)
        }, 800);
        event.preventDefault();
    });


    /* Active class on nav items */
    $("body").scrollspy({
        target: ".scrollspy-nav",
        offset: 300
    })


    /* Close lightbox */
    $(document).on('lity:open', function(event, instance) {
        $('.c-lity-close').click(function () { 
            instance.close(); 
        }); 
    });

    /* Form floating labels */
    $(document).on('focus','form input,form textarea,form select',
        function() {
            $(this).closest('.float-label').find('label').addClass('active'); 
        }
    );
    $(document).on('blur','form input,form textarea,form select',
        function() {
            if($(this).closest('.float-label').find('input').val()=='' || $(this).closest('.float-label').find('textarea').val()=='' || $(this).closest('.float-label').find('select').val()=='' )
            $(this).closest('.float-label').find('label').removeClass('active');  
        } 
    );
    $('form input,form textarea,form select').each(function(){
        if ($(this).val().length > 0) {
            $(this).closest('.float-label').find('label').addClass('active'); 
        }
        else{
        
        }
    });

    /* Formspree Ajax form  */
    $(document).ready(function() {
        $('#form-contact').on('submit', function(e) {
            e.preventDefault();
            
            var firstName = $('#first-name').val();
            var lastName = $('#last-name').val();
            var email = $('#email').val();
            var contactNumber = $('#contact-number').val();
            var message = $('#message').val();

           
            //send to formspree
            $.ajax({
                url:'https://formspree.io/f/xrgyorld',
                method:'POST',
                data:{
                    firstName:firstName,
                    lastName:lastName,
                    _replyto:email,
                     email:email,
                    contactNumber:contactNumber,
                    message:message,
                    _subject:'Venox Form Submission',
                },
                dataType:"json",
                success:function() {
                    $('#thankyouBlock').fadeIn();
                }   

            });     
            
        });

    }); 
