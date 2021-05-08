import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuOptionsService {

  menuOptions=[
    {"route":"/dashboard","name":"Home"},
    {"route":"/dashboard/transactions","name":"Ingresos y gastos"},
    {"route":"/dashboard/budgets","name":"Presupuestos"},
    {"route":"/dashboard/transactionCategories","name":"Categorias de transacción"},
    {"route":"/dashboard/accounts","name":"Cuentas"},
  ]
  constructor() { }
}
