import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http' 

// import  {countrycitystatejson} from 'countrycitystatejson';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
isLoggedIn:boolean = false
  constructor(private http: HttpClient) { }

  postUser(data:any){
    return this.http.post<any>("http://localhost:3000/userList/", data)

  }
  getUser(){
    return this.http.get<any>("http://localhost:3000/userList")

  }

  putUser(data:any, id:number){
return this.http.put<any>("http://localhost:3000/userList/" +id, data)
  }
  
  deleteUser(id:number) {
    return this.http.delete<any>("http://localhost:3000/userList/" +id)
  }

  logIn(data:any) {
    return this.http.post<any>("http://localhost:3000/login/", data)
   
  }
  // private countryData = countrycitystatejson;

  // getCountries() {
  //   return this.countryData.getCountries();
  // }

  // getStatesByCountry(countryShotName: string) {
  //   return this.countryData.getStatesByShort(countryShotName);
  // }

  // getCitiesByState(country: string, state: string) {
  //   return this.countryData.getCities(country, state);
  // }
}
