const { Router } = require("express");
const express = require("express");
const Api = require("./Api");

const PORT = 8080;
const app = express();
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
const API = new Api(products);


app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/', express.static('public'));


APIRouter.get('/', (req, res) => res.send(API.container));


APIRouter.get('/productos', (req, res) =>{
    res.send(API.container);
})

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- //
APIRouter.get('/productos/:id', (req, res) =>{
    let product = API.getById(req.params.id);

    if(!product) res.status(400).send(`There is not object with id: ${req.params.id}`);
    else res.status(200).send(product);
})


APIRouter.post('/productos', (req, res) =>{
    
    if(API.addProduct(req.body)) res.status(200).json({ added: req.body }); 

    else res.status(400).send('Ya existe un objeto con ese ID');
})


APIRouter.put('/productos/:id', (req, res) =>{
    if(API.addProduct(req.body, req.params.id)){
        res.status(200).json({ lastModfication: req.body });
    }
    else res.status(300).send('ID del producto no coincide con el URL');
})


APIRouter.delete('/productos/:id', (req, res) =>{
    const id = req.params.id;
    if(API.deleteById(id)){
        res.status(200).json(`deleted product with ID ${id}`);
    }
    else res.status(300).send(`That product doesn't exist`);
})


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- //
app.use('/API', APIRouter);
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

