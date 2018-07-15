import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
Generated class for the MovieProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class MovieProvider {
    private baseApiPath = "https://api.themoviedb.org/3";
    
    constructor(public http: HttpClient) {
        console.log('Hello MovieProvider Provider');
    }

    getApiKey(): string {
        return "f4f3e4b659484ab4417fe417e17500e8";
    }
    
    getLatestMovies() {
        return this.http.get(this.baseApiPath + "/movie/latest?api_key=" + this.getApiKey());
    }

    getPopularMovies() {
        return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.getApiKey());
    }
}
