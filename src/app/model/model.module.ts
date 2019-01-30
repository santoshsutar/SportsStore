import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { AuthService } from "./auth.service";
@NgModule({
    providers: [ProductRepository, StaticDataSource, Cart,
        Order, OrderRepository,AuthService],
    
})
export class ModelModule { }