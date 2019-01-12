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
