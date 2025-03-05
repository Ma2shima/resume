/**
 * Created with JetBrains PhpStorm.
 * User: Vitaly
 * Date: 06.06.13
 * Time: 20:22
 * To change this template use File | Settings | File Templates.
 */

function isValid(elem) {
    var validation = false;
    var r = /^\w+@\w+\.\w{2,4}$/i;

    if (elem.id === 'email-field' && r.test(elem.value)) {
        validation = true
    } else validation = elem.id !== 'email-field' && elem.value !== '' && elem.value !== elem.getAttribute('data-attr');

    return validation;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == 'object') {
            if (arrayCompare(haystack[i], needle)) return true;
        } else {
            if (haystack[i] == needle) return true;
        }
    }
    return false;
}

window.isset = function (v) {
    if (typeof(v) == 'object' && v == 'undefined') {
        return false;
    } else if (arguments.length === 0) {
        return false;
    } else {
        var buff = arguments[0];
        for (var i = 0; i < arguments.length; i++) {
            if (typeof(buff) === 'undefined' || buff === null) return false;
            buff = buff[arguments[i + 1]];
        }
    }
    return true;
};

function myconf() {
    var cf = $.Deferred();
    $.ajax({
        type: 'POST',
        url: 'feedback/',
        dataType: 'json',
        data: 'act=cfg',
        success: function (answer) {
            cf.resolve(answer.configs);
        }
    });
    return cf;
}

var mcf = myconf();

mcf.done(function (conf) {
    $(document).ready(function () {
        (function () {
            var fb = $('.feedback');
            if (fb.length > 0) {
                fb.each(function () {
                    var form = $(this).closest('form'), name = form.attr('name');

                    if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
                        $(form).prepend('<input type="text" name="' + conf[name].cfg.antispamjs + '" value="tesby" style="display:none;">');
                    }
                });
            }
        })();
    });

    /**
     * Отправка форм.
     *
     */

    function feedback(vars) {
        var bt = $(vars.form).find('.feedback');
        var btc = bt.clone();
        var bvc = bt.val();
        var cfg = conf[vars.act].cfg;

        $.ajax({
            type: 'POST',
            url: 'feedback/',
            cache: false,
            dataType: 'json',
            data: 'act=' + vars.act + '&' + vars.data,
            beforeSend: function () {
                //$(bt).val('');
                $(bt).prop("disabled", true);
                $(bt).addClass('loading');
            },
            success: function (answer) {

                if (isset(cfg.notify) && !/none/i.test(cfg.notify)) {

                    if (/textbox/i.test(cfg.notify)) {
                        if (isset(answer.errors)) {
                            $.each(answer.errors, function (k, val) {
                                $.jGrowl(val, {theme: 'error', header: 'Ошибка!', life: 3000});
                            });
                        }
                        if (isset(answer.infos)) {
                            $.each(answer.infos, function (k, val) {
                                $.jGrowl(val, {theme: 'infos', header: 'Внимание!', life: 3000});
                            });
                        }

                    }
                    if (/color/i.test(cfg.notify)) {
                        $(vars.form).find('input[type=text]:visible, textarea:visible, select:visible').css({'border': '1px solid #D7D5CF'}, 300);
                        if (isset(answer.errors)) {
                            $.each(answer.errors, function (k, val) {
                                var reg = /[a-z]/i;
                                if (reg.test(k)) {
                                    var e = $(vars.form).find('[name=' + k + ']');
                                    if (e.length == 1) {
                                        $(e).css({'border': '1px solid #FF532E'}, 100);
                                    }
                                }
                            });
                        }
                        if (isset(answer.infos)) {
                            var li = '', $inf = $('<ul>', {id: 'feedback-infolist'});
                            $.each(answer.infos, function (k, val) {
                                li += '<li>' + val + '</li>';
                            });

                            $inf.html(li);


                            if (/modal/i.test(cfg.notify)) {
                                var m = $('<div class="box-modal" id="feedback-modal-box" />');
                                m.html($inf);
                            }
                            //bt.replaceWith($inf);

                            /* setInterval(function(){
                               //$('#feedback-inf-box').replaceWith(btc);
                               $('#feedback-modal-box').arcticmodal('close');
                             }, 4000);*/
                        }

                    }
                }
                $(bt).prop("disabled", false);
                $(bt).removeClass('loading');
                //$(bt).val(bvc);

                if (isset(answer.ok) && answer.ok == 1) {
                    $(vars.form)[0].reset();
                }
            }
        });

        // Send file via PHPMailer & Google SMTP
        var formUpload = $('.form-upload')[0];
        var formUploadInput = $('.form-upload__input');
        var fd = new FormData(formUpload);

        $.ajax({
            type: 'POST',
            url: './feedback/gmail.php',
            data: fd,
            contentType: false,
            processData: false,

            success: function (msg) {
                if (msg['error']) {
                    console.log(msg['error']);
                } else {
                    // setTimeout(function() {
                    // formUploadInput.replaceWith(formUploadInput.val('').clone(true))
                    // }, 3000);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })
    }

    $(document).on('mouseenter mouseover', '.feedback', function () {
        var form = $(this).closest('form'), name = form.attr('name');
        if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
            $('input[name=' + conf[name].cfg.antispamjs + ']').val('');
        }
    });

    /**
     * Обработчик кнопки форм.
     * Кнопка должна быть внутри тегов <form> c классом .feedback
     * будет отправлено любое кол-во полей, кроме файлов
     *
     */

    $(document).on('click', '.feedback', function () {
        var contactForm = document.querySelector('.desktop-modal');
        var inputName = contactForm.querySelector('#name');
        var inputProjectName = contactForm.querySelector('#project-desc');
        var inputEmail = contactForm.querySelector('#email-field');
        var form = $(this).closest('form'), name = form.attr('name'), obj = {};

        obj.form = form;
        obj.act = name;
        obj.data = $(form).serialize();

        var validation = isValid(inputName) && isValid(inputProjectName) && isValid(inputEmail);

        if ($(this).attr('id') === "submitform") {
            validation && feedback(obj);
        } else {
            feedback(obj);
        }

        return false;
    });
});
