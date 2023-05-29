import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


const url = 'https://pokeapi.co/api/v2/'

@Injectable({
    providedIn: 'root',
})

export class RequestService{
    constructor(private http: HttpClient){

    }

    
    getRequest(param: string = ''):Observable<any>{
        let temp = url + param;
       
        return this.http.get(temp)
    }

}