import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../Models/Product";
import { InputModel, token } from "../Models/InputModel";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AppService
{
    private readonly urlBackEnd = environment["apiBackEnd"];
    private readonly urlToken = environment["apiToken"];

    tokenUser: any;

    constructor (private httpClient: HttpClient)
    {

    }

    public GerarToken()
    {
        var url = this.urlToken;
        var user = {
            Email: "eduardo@teste.com",
            Password: "@Eduardo1"
        }

        return this.tokenUser = this.httpClient.post<string>(url, user, 
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':
                    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            })
        });
    }

    public ProductList(tokenUser: any)
    {
        var url = this.urlBackEnd + "ProductsList";
        return this.httpClient.get<Object>(url, 
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${tokenUser}`
            })
        })
    }

    public ProductAdd(product: any, tokenUser: any)
    {
        var url = this.urlBackEnd + "ProductAdd";
        return this.httpClient.post<Product>(url,  product,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${tokenUser}`
            })
        })
    }
}