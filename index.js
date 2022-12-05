const PATH = "./productos.txt";
const PORT = 8080;

const { Router } = require("express");
var express = require("express");
var app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//app.use(express.static('/public'));


app.use('/', express.static('public'));

const APIRouter = Router();

let products = [ 
    {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 1
    },
    {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
    },
    {
    "title": "Microscopio",
    "price": 456.78,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 3
    }
];    


app.get('/', (req, res) => {
    //res.render('index.html');
})



APIRouter.get('/productos', (req, res) => res.send(products));



APIRouter.get('/productos/:id', (req, res) =>{
    let product = products.filter((obj) => obj.id == req.params.id);
    
    if(!product.length)res.send('NONE OBJECT');
    else res.send(product);
})


APIRouter.post('/productos', (req, res) =>{
    const filteredProducts = products.filter((obj) =>  obj.id == req.body.id)
    
    if(!req.body.length) console.log('EL BODY ESTA VACIO');
    if(filteredProducts.length) res.send(`A product with ${req.params.id} ID, already exist`);
    else{
        products.push(req.body);
        res.status(200).json({ added: req.body});  
    }
})


APIRouter.put('/productos/:id', (req, res) =>{
    const filteredProducts = products.filter((obj) => obj.id == req.params.id)
    
    if(req.params.id != req.body.id)
    res.status(300).send(`The product ID (${req.body.id}) doesn't match path ID (${req.params.id})`);

    else if(filteredProducts.length) res.send(`A product with ${req.params.id} ID, already exist`);
    else{
        products.push(req.body);
        res.status(200).json({ added: req.body });  
    }
})



//FUNCIONA - - - CAMBIAR: intentar incorporar logica para actualizar los id o busca otra manera de implementarlos.

APIRouter.delete('/productos/:id', (req, res) =>{
    const filteredProducts = products.filter((parsedData) => parsedData.id == req.params.id)
    
    if(!filteredProducts.length) res.status(400).send('That Product doesnt exist');
    else{
        products = products.filter( (obj) => obj.id != req.params.id);
        res.status(200).json({ newlist: products});  
    }
})


app.use('/API',APIRouter);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

