document.addEventListener('keydown', function () {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});

window.onload = function () {
    scroll();
};

(function () {
    var $init = $('.slide-from-left');
    if ($init.length) {
        $init.bind('inview', function (event, isInView) {
            var $this = $(this);
            if (isInView) {
                this.style.right = -100 + '%';
            }
        })
    }
}());


(function () {
    var $init = $('.slide-from-right-here');
    if ($init.length) {
        $init.bind('inview', function (event, isInView) {
            var $this = $(this);
            if (isInView) {
                slideFromRight();
            }
        })
    }
}());


document.addEventListener("mousemove", function (e) {
    document.getElementById('x').style.left = (e.clientX - 27) + 'px';
    document.getElementById('x').style.top = (e.clientY - 27) + 'px';
}, false);

document.addEventListener('click', function () {
    if (document.getElementById('x').classList.contains('hover')) {
        document.getElementById('x').classList.remove('hover');
        document.getElementById('x').classList.add('pulse');
    }
    else {
        document.getElementById('x').classList.add('pulse-waves');
    }

    setTimeout(function () {
        document.getElementById('x').classList.remove('pulse');
        document.getElementById('x').classList.remove('pulse-waves');
    }, 500)
});

document.addEventListener('mousemove', function () {
    var pseudo = $('#pseudoCont');
    var works = $('.works-item-content');
    var chat = $('#chat');
    var x = $('#x');
    var link = $('a');

    works.on("mouseenter", function () {
        x.html('view');
        x.addClass("hover");
    });
    works.on("mouseleave", function () {
        x.removeClass("hover");
    });
    chat.on("mouseenter", function () {
        x.html('chat');
        x.addClass("hover");
    });
    chat.on("mouseleave", function () {
        x.removeClass("hover");

    });
    link.on("mouseenter", function () {
        x.removeClass("hover");
        x.addClass("onlink");
    });
    link.on("mouseleave", function () {
        x.removeClass("onlink");
        pseudo.css('pointer-events','auto');
        setTimeout(function () {
            pseudo.css('pointer-events','none');
        },40)
    });
});

function clearValue(elem) {
    elem.style.color = '#fff';
    if (elem.value === elem.getAttribute('data-attr')) {
        elem.value = '';
    }
}

function setValue(elem) {
    elem.style.color = '#333';

    if (elem.value === '') {
        elem.value = elem.getAttribute('data-attr');
    }
}

function closeError(elem) {
    elem.parentElement.querySelector('.ourInputError').innerHTML = '';
}

function moveShevronRight(elem) {
    setTimeout(function () {
        elem.getElementsByClassName('inner')[0].style.marginLeft = 1 + 'px';
    }, 250)
}

function moveShevronLeft(elem) {
    setTimeout(function () {
        elem.getElementsByClassName('inner')[0].style.marginLeft = -30 + 'px';
    }, 250)
}

function moveLeftShevronRight(elem) {
    setTimeout(function () {
        elem.getElementsByClassName('inner')[0].style.marginLeft = -30 + 'px';

    }, 250)
}

function moveLeftShevronLeft(elem) {
    setTimeout(function () {
        elem.getElementsByClassName('inner')[0].style.marginLeft = 1 + 'px';
    }, 250)
}

function openDeligateModal(event) {

    t=event.target||event.srcElement;

    t.tagName !== 'A' ?  openDesktopModal() : footerRedirect();

    function footerRedirect() {
        window.open(t.href, '_blank');
    }
    // openDesktopModal();

    // if (window.innerWidth > 768) {
    //     openDesktopModal();
    // }
    // else {
    //     openMobileModal();
    // }
}

function openDesktopModal() {
    var contactForm = document.querySelector('.desktop-modal');
    var desktopModalTitle = document.querySelector('.desktop-modal__title');
    var step1 = document.querySelector('.step-1');
    var step2 = document.querySelector('.step-2');
    var step3 = document.querySelector('.step-3');
    var stepSubmit = document.querySelector('.step-submit');
    var desktopModalInfo = document.querySelector('.desktop-modal__add-info');

    document.querySelector('body').style.overflowY = "hidden";
    contactForm.style.zIndex = 1100;
    contactForm.style.height = 100 + "%";

    var currentWidth = document.getElementById('modal').offsetWidth;

    setTimeout(function () {
        desktopModalTitle.classList.add('slidedown');
    }, 200);

    setTimeout(function () {
        step1.classList.add('slidedown');
    }, 500);

    setTimeout(function () {
        step2.classList.add('slidedown');
    }, 900);

    setTimeout(function () {
        step3.classList.add('slidedown');
    }, 1300);

    setTimeout(function () {
        stepSubmit.classList.add('slidedown');
    }, 1700);

    setTimeout(function () {
        desktopModalInfo.classList.add('slidedown');
    }, 2000);


    // Drag'n'drop
    var dropZone = $('.form-upload');

    dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
        return false;
    });

    dropZone.on('dragover dragenter', function() {
        dropZone.addClass('dragover');
    });

    dropZone.on('dragleave', function(e) {
        dropZone.removeClass('dragover');
    });

    dropZone.on('dragleave', function(e) {
        let dx = e.pageX - dropZone.offset().left;
        let dy = e.pageY - dropZone.offset().top;

        if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
            dropZone.removeClass('dragover');
        }
    });

    dropZone.on('drop', function(e) {
        dropZone.removeClass('dragover');
        let files = e.originalEvent.dataTransfer.files;
        // sendFiles(files);
    });

    $('#file-input').change(function() {
        let files = this.files;
        // sendFiles(files);
    });
}

// ---------------------------------------------------------------------------------------------------------------------


var letsChat = document.querySelector('.lets-chat');
var closeModalBtn = document.querySelector('.close-modal');
var stepSuccess = document.querySelector(".step-success");
var inputFields = [].slice.call(contactForm.querySelectorAll('.step-field'));
var errorFields = [].slice.call(contactForm.querySelectorAll('.ourInputError'));

letsChat.addEventListener('click', function (e) {
    e.preventDefault();

    if (closeModalBtn.style.position !== 'fixed') {
        setTimeout(function () {
            closeModalBtn.style.position = 'fixed';
        }, 300);
    }

    if (stepSuccess.classList.contains('slideup-submit-success')) {
        stepSuccess.classList.remove('slideup-submit-success');
    }
});

function closeModal() {
    closeModalBtn.style.position = 'absolute';

    document.querySelector('body').style.overflowY = "auto";
    document.querySelector('.desktop-modal').style.height = '0';

    inputFields.forEach(function (item) {
        item.value = '';
    });

    errorFields.forEach(function (error) {
        error.innerHTML = '';
    });

    scroll();
}

function openMobileModal() {
    document.getElementById('mobile-modal').style.top = 0;
}

function closeMobileModal() {
    document.getElementById('mobile-modal').style.top = -100 + '%';
}

function scroll() {
    $("#navbar-container").on("click", "a", function (event) {

        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 170;

        //анимируем переход на расстояние - top за 1000 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });
}


$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll <= 500) {
        $("#stikyNavbar").css("opacity", "0");
    } else {
        $("#stikyNavbar").css("opacity", "1");
    }
});

$(document).ready(function () {
    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
        delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
        if (delta >= 0) {
            document.getElementById('stikyNavbar').style.top = 0 + 'px';
        }
        else if (delta <= 0 && $(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
            document.getElementById('stikyNavbar').style.top = 0 + 'px';
        }
        else if (delta <= 0) {
            document.getElementById('stikyNavbar').style.top = -60 + 'px'

        }
    });
});

(function () {  //safari special
    var $init = $('.info-social');
    if ($init.length) {
        $init.bind('inview', function (event, isInView) {
            if (isInView) {
                document.getElementById('stikyNavbar').style.top = 0 + 'px'
            }
        })
    }
}());
