var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'TEST-6304899592642937-112601-bf8e7e99cba0ff3ac1f61727f0231e0a-240313692'
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'PRODUCTO',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
  console.log(response.body.sandbox_init_point)
}).catch(function(error){
  console.log(error);
});


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});


app.post('/cho', function (req, res) {
    console.log(req.params);
    console.log(req.query);
    res.status(200).json({ok:true});
});

app.listen(port);