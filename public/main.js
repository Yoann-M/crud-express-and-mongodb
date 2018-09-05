var update = document.getElementById('update')
var del = document.querySelectorAll('#delete')
var btnModal = document.querySelectorAll('#open-modal')
var modal = UIkit.modal("#modal-example")
var modalInputId = document.getElementById('update-id')
var modalInputName = document.getElementById('update-name')
var modalInputQuotes = document.getElementById('update-quotes')


// Déclenchement de la Modal
btnModal.forEach(function (element) {
    element.addEventListener('click', function (el) {
        // var quote = el.currentTarget.parentNode.parentNode
        // var quoteName = quote.getElementsByClassName('js_quote--name')[0].innerText
        // var quoteQuote = quote.getElementsByClassName('js_quote--quote')[0].innerText
        // var quoteId = quote.getElementsByClassName('js_quote--id')[0].innerText
        modalInputId.value = el.currentTarget.dataset.id;
        modalInputName.value = el.currentTarget.dataset.name;
        modalInputQuotes.value = el.currentTarget.dataset.quote;
        modal.show();
    })
})

update.addEventListener('click', function (el) {
    var id = modalInputId.value;
    var name = modalInputName.value;
    var quote = modalInputQuotes.value;
    fetch('quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            '_id': id,
            'name': name,
            'quote': quote
        })
    })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
})


del.forEach(function (element) {
    var id = element.dataset.id;
    var name = element.dataset.name;
    element.addEventListener('click', function () {
        UIkit.modal.confirm('Vous êtes sur le point de supprimer <b>' + name + '</b> !<br> Souhaitez-vous confirmer la suppression ?', { labels: { ok: 'Confirmer', cancel: 'Annuler' } }).then(function () {
            //console.log('Confirmed.')
            fetch('quotes', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    '_id': id
                })
            })
                .then(res => {
                    if (res.ok) return res.json()
                }).
                then(data => {
                    console.log(data)
                    window.location.reload()
                })
        }, function () {
            //console.log('Rejected.')
        });

    })
})