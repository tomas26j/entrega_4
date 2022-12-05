class Api{
    constructor(_array) {
        this.container = _array;
        this.containerLength = this.container.length + 1;
    }

    getAll(){
        return this.container;
    }

    getById(_id){
        let product = this.container.filter((obj) => obj.id == _id);
        
        if(!product.length) return null;
        else return product;
    }

    deleteById(_id){
        let products = this.container.filter((obj) => {return obj.id == _id;}); // Chequeo de la existencia del producto

        if(!products.length) return false; //Si no existe el producto retorna false
        else{
            this.container = this.removeObjectWithId(this.container, _id); //Actualiza el container eliminando el producto
            return true;
        }
    }
    
    removeObjectWithId(arr, id) {
        return arr.filter((obj) => obj.id != id);
    }

    addProduct(_body, _pathId){        
        const clonedBody = _body;

        // Se ejecuta cuando el post/put se realiza con un ID en la URL
        if(_pathId){ 
            if(_body.id != _pathId) return false;  //retorna falso porque no coinciden el ID del objeto con el URL
            
            let filtered = this.container.filter((obj) => obj.id == _body.id); // Chequea si ya existe ese numero
            
            if(filtered.length) this.container = this.removeObjectWithId(this.container, _pathId);
            this.container.push(_body); 
            return true;                
        }
        
        // Mapeo para buscar el ID mas alto del Array
        const containerIDs = this.container.map((obj) => {return obj.id}); 

        // Si el post se hace sin un ID en el URL se cambia automaticamente al Ultimo ID
        clonedBody.id = Math.max(...containerIDs) + 1;
        this.container.push(clonedBody); 
        return true;
    }

}

module.exports = Api;





/*
addProduct(_body, _pathId){        
        const clonedBody = _body;
        const clonedContainer = Array.from(this.container);

        // Mapeo para buscar el ID mas alto del Array
        const containerIDs = this.container.map((obj) => {return obj.id}); 

        // Si el post/put se hace sin un ID en el URL se cambia automaticamente al Ultimo ID
        clonedBody.id = Math.max(...containerIDs) + 1;
        
        
        // Se ejecuta cuando el post/put se realiza con un ID en la URL
        if(_pathId){ 
            if(_body.id != _pathId) return false;  //retorna falso porque no coinciden el ID del objeto con el URL
            
            let filtered = this.container.filter((obj) => obj.id == _body.id); // Chequea si ya existe ese numero
 
            console.log(this.container);
            if(filtered.length) this.container = this.deleteById(_pathId);
            console.log(this.container);
            this.container.push(_body); 
            
            return true;                
        }
        else this.container.push(clonedBody); return true;
    }
*/