import { Component } from "@angular/core";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";
@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
    public orders:Order[];
    private includeShipped=false;
    constructor(private repository: OrderRepository) { 
        this.orders=this.getOrders();
    }
    public includeShipped1():void
    {
        this.includeShipped=!this.includeShipped;
        this.orders=this.getOrders();
        console.log(this.orders);
        
    }
   public getOrders(): Order[] {
       
       
        return this.repository.getOrders()
            .filter(o => this.includeShipped || !o.shipped);
    }
    markShipped(order: Order) {
        order.shipped = true;
        this.repository.updateOrder(order);
        this.orders=this.getOrders();
    }
    delete(id: number) {
        this.repository.deleteOrder(id);
        this.orders=this.getOrders();
    }
}