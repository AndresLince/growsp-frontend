export class TransactionCategory{
    
    constructor(       
        public id:number ,
        public name:string,
        public type:number       
    ){}   

    get type_name(){   
        
        return (this.type===0)?'Gasto':'Ingreso';        
    }
}