function submitMobileForm(event) {

    event.preventDefault();

    var r = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;


    var form = document.getElementById('mobile-form');

    var fields = form.querySelectorAll('.field');


    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            console.log('field is blank', fields[i]);
            fields[i].nextElementSibling.innerHTML =  svg + fields[i].getAttribute('data-attr')
        }
        else if(fields[i].id === 'email'){
            if (!r.test(fields[i].value)) {
                fields[i].nextElementSibling.innerHTML =  svg + fields[i].getAttribute('data-attr')
            }
        }
        else {

        }
    }
}