
//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
var ShipperExpensesUtilitiy = function () {
    var skipClickDelay = function (e) {
        e.preventDefault();
        e.target.click();
    },

    setAriaAttr = function (el, ariaType, newProperty) {
        el.setAttribute(ariaType, newProperty);
    },

    setAccordionAria = function (el1, el2, expanded) {
        switch (expanded) {
            case "true":
                setAriaAttr(el1, 'aria-expanded', 'true');
                setAriaAttr(el2, 'aria-hidden', 'false');
                break;
            case "false":
                setAriaAttr(el1, 'aria-expanded', 'false');
                setAriaAttr(el2, 'aria-hidden', 'true');
                break;
            default:
                break;
        }
    },

    //function
    switchAccordion = function (e) {
        e.preventDefault();

        var thisAnswer = e.target.parentNode.nextElementSibling, thisQuestion = e.target;

        if (thisAnswer.classList.contains('is-collapsed')) {
            setAccordionAria(thisQuestion, thisAnswer, 'true');
        } else {
            setAccordionAria(thisQuestion, thisAnswer, 'false');
        }

        // close any other panels
        $('dd.is-expanded').not(thisAnswer).removeClass('is-expanded').addClass('is-collapsed');
        $('dt a.is-expanded').not(thisQuestion).removeClass('is-expanded');


        //thisQuestion.classList.toggle('is-collapsed');
        thisQuestion.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('is-collapsed');
        thisAnswer.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('animateIn');

    },
    Init = function () {
        d = document,
        accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
        //setAria,
        //setAccordionAria,
        //switchAccordion,
        touchSupported = ('ontouchstart' in window),
        pointerSupported = ('pointerdown' in window);

        
        for (var i = 0, len = accordionToggles.length; i < len; i++) {
            if (touchSupported) {
                accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
            }
            if (pointerSupported) {
                accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
            }
            accordionToggles[i].addEventListener('click', switchAccordion, false);
        }





        // click on pointers show distinations for this
        $('.accordion-content p button.btn-inverse').click(function (e) {
            e.preventDefault();

            // hide all other distinations
            $(this).closest('div.accordion').find('button.btn-light').addClass('hidden', 1000); // reset

            // animated show distinations for this point.
            $(this).closest('p').find('button.btn-light.hidden').removeClass('hidden', 1000, "easeInBack").addClass('animateIn');

        });


        //// show expenses table for this filter
        //$('button.btn-light').click(function (e) {
        //    e.preventDefault();
        //    //$('button.btn-light.btn-light-border').removeClass('btn-light-border');
        //    //$(this).addClass('btn-light-border');

        //});
    };



    return {
        Init: Init
    };
}();