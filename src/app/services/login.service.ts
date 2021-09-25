import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { Role, User, UserResponse } from 'src/app/shared/models/user.interface';
 import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/LoginRequest.interfaces';
import { RefreshRequest } from '../interfaces/RefreshRequest.interface';

const helper =new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  //variables observables 
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,private router: Router) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

   login(authData:LoginRequest): Observable<LoginRequest> {
     return this.http
     .post<LoginRequest >(`${environment.API}/auth/login`,authData)
     .pipe(
       map((res:any) =>{
         console.log(res.data)

        localStorage.setItem('token', res.data.payload.token);
        localStorage.setItem('tokenRefresh', res.data.payload.refresh_token);
         return res
       }),
       catchError((err)=> this.handlerError(err))
     );
   }

   refresh(): Observable<RefreshRequest> {

    const token=localStorage.getItem('tokenRefresh')
    const tokenRefresh={refresh_token:token}

    return this.http
    .post<RefreshRequest >(`${environment.API}/auth/refresh`,tokenRefresh)
    .pipe(
      map((res:any) =>{

        localStorage.setItem('token', res.payload.tokens);
        localStorage.setItem('tokenRefresh', res.payload.refresh_token);
        return res
      }),
      catchError((err)=> this.handlerError(err))
    );
  }

//   logout():void{
//     localStorage.removeItem('token')
//     this.loggedIn.next(false)
//     this.router.navigate(['/login'])
//   }

   private checkToken():void{

     let userToken=localStorage.getItem('token') ;

     if (userToken) {
      
       const isExpired = helper.isTokenExpired(userToken);
       const tokeninfo=helper.decodeToken(userToken)

       if (isExpired) {
         this.refresh()
       }else{
          this.loggedIn.next(true);
       }
     }
   }



  private handlerError(err: any):Observable<never>{

    let errorMessage = "Ha ocurrido un error recibiendo la data";
    if (err) {
      errorMessage = `Error: code ${err}`;
    }
    alert("error del lado del servidor")
    return throwError(errorMessage);
  }
  
  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';
      
      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
}