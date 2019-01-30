import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { StaticDataSource } from "./static.datasource";
@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    constructor(private dataSource: StaticDataSource) { }
    
    getOrders(): Order[] {
        this.dataSource.getOrders()
        .subscribe(orders => this.orders = orders);
        return this.orders;      
    }
    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }
    updateOrder(order: Order) {
        this.dataSource.updateOrder(order);
    }
    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id);
        this.orders.splice(this.orders.findIndex(o => id == o.id));
    }
}