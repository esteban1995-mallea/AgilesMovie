import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { Role, User, UserResponse } from 'src/app/shared/models/user.interface';
 import { environment } from 'src/environments/environment';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';

//const helper =new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {


  constructor(private http:HttpClient,private router: Router) { 

  }

  infomacionUsuario(): Observable<any> {

    return this.http
    .get<any>(`${environment.API}/user/me`,)
    .pipe(
      map((res:any) =>{
        return res
      }),
      catchError((err)=> this.handlerError(err))
    );
  }


  private handlerError(err: any):Observable<never>{

    let errorMessage = "Ha ocurrido un error recibiendo la data";
    if (err) {
      errorMessage = `Error: code ${err.error.msg}`;
    }

    return throwError(errorMessage);
  }
  

}