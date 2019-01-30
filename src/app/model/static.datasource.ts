import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, from } from "rxjs";
import { Order } from "./order.model";
import * as faker from 'faker/locale/de_AT';
@Injectable()
export class StaticDataSource {

    auth_token: string;
    private products: Product[];
    private orders: Order[];
    /**
     *
     */
    constructor() {
        let localProducts = localStorage.getItem("products");
        if (localProducts == null) {
            var data = [];
            this.products = [];
            var categories = ["Watersports", "Soccer", "Chess", "Running"];
            faker.seed(10);
            for (let i = 1; i <= 50; i++) {
                var category = faker.helpers.randomize(categories);
                data.push({
                    id: i,
                    name: faker.commerce.productName(),
                    category: category,
                    description: `${category}: ${faker.lorem.sentence(3)}`,
                    price: faker.commerce.price()
                });
            }
            this.products = data;
        }
        else {
            this.products = JSON.parse(localProducts) as Product[];
        }
        let localOrders = localStorage.getItem("orders");
        if (localOrders == null) {
            this.orders = [];
        }
        else {
            this.orders = JSON.parse(localOrders) as Order[];
        }
    }

    getProducts(): Observable<Product[]> {

        return from([this.products]);
    }
    saveOrder(order: Order): Observable<Order> {
        this.orders.push(order);
        localStorage.setItem("orders", JSON.stringify(this.orders));
        return from([order]);
    }
    authenticate(user: string, pass: string): Observable<boolean> {
        this.auth_token = "true";
        return from([true]);
    }
    saveProduct(product: Product): Observable<Product> {
        this.products.push(product);
        localStorage.setItem("products", JSON.stringify(this.products));
        return from([product]);
    }
    updateProduct(product): Observable<Product> {
        this.products.forEach(p => {
            if (p.id == product.id) {
                p.category = product.category;
                p.description = product.description;
                p.name = product.name;
                p.price = product.price;
            }
        });
        localStorage.setItem("products", JSON.stringify(this.products));
        return from([product]);
    }
    deleteProduct(id: number): void {
        this.products.splice(this.products.
            findIndex(p => p.id == id), 1);
        localStorage.setItem("products", JSON.stringify(this.products));
    }
    getOrders(): Observable<Order[]> {
        let localOrders = localStorage.getItem("orders");
        this.orders = JSON.parse(localOrders) as Order[];

        return from([this.orders]);
    }
    deleteOrder(id: number): void {
        this.orders.splice(this.orders.
            findIndex(p => p.id == id), 1);
            console.log(this.orders);
            
        localStorage.setItem("orders", JSON.stringify(this.orders));
    }
    updateOrder(order: Order): void {
        this.orders.forEach(p => {
            if (p.id==order.id) {
                p.shipped = order.shipped;
            }           

        });
        localStorage.setItem("orders", JSON.stringify(this.orders));       
    }

}