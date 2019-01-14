$(document).ready(function() {

    init();

    var addButton = $('#add');

    addButton.click(function() {

        //data in format YYYY-MM-DD
        var date = $('#date').val();
        var newDate = moment(date).format('DD/MM/YYYY');
        var amount = parseInt($('#amount').val());
        var salesman = $('#venditore').val();

        addSale(newDate, amount, salesman);

        // chiamo una funzione che verifichi che i miei dati siano corretti. Ritorna un valore vero o falso

        var dataIsValid = checkData(newDate, amount, salesman);

        if (dataIsValid == true)
        {
            addSale(newDate, amount, salesman);
        }
        else {
            alert('Inserisci dati corretti');
        }

    });
});

function init()
{
    $.ajax({
        url: 'http://157.230.17.132:4005/sales',
        method: 'GET',
        success: function(data)
        {
            printSalesmenSelect(data);
            printPieChart(data);
            printLineChart(data);
        },
        error: function()
        {
            alert('Si è verificato un errore');
        }
    });
}

function addSale(date, amount, salesman)
{
    $.ajax({
        url: 'http://157.230.17.132:4005/sales',
        method: 'POST',
        data: {
            "salesman": salesman,
            "amount": amount,
            "date": date
        },
        success: function(data)
        {
            init();
        },
        error: function()
        {
            alert('Si è verificato un errore');
        }
    });
}

function printSalesmenSelect(results)
{
    //creare un array vuoto

    var venditori = [];

    //prendere il selettore con jquery

    var venditoreSelect = $('#venditore');

    //creare e fare un ciclo per vedere tutte le vendite e prendere ogni venditore

    for (var i = 0; i < results.length; i++) {

        var vendita = results[i];

        // aggiunge all'array il venditore nel caso in cui non sia stato preso e stamparlo a schermo
        
        if (!venditori.includes(vendita.salesman))
        {
            venditori.push(vendita.salesman);

            var template = $('.templates option').clone();

            template.val(vendita.salesman);
            template.html(vendita.salesman);

            venditoreSelect.append(template);
        }
    }
}
