export class Transaction{
    
    constructor(
        public id_transaction:string,
        public description:string,   
        public value:number,
        public quantity:number,  
        public id_account:number ,
        public account_name:string,
        public budget_detail_name:string,
        public type:number,
        public category_name:string,
        public date:string,
        public id_transaction_category,
        public budget_name  
    ){}

    get netValue(){   
        return this.value*this.quantity
    }

    get type_name(){   
        
        return (this.type===0)?'Gasto':'Ingreso';        
    }

    get dateString(){
        
        return this.date.substring(0,10);
    }

}