import { Transaction } from '../models/transaction.model';
export interface GetTransactions{
    total:number,
    transactions:Transaction[]
}