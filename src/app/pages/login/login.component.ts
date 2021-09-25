import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators,FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm= this.Fb.group({
    username: [''],
    password: [''],
  });


 

  constructor( private Fb:FormBuilder,private router:Router,private login_services:LoginService) { }
  

  ngOnInit(): void {

  }




  onLogin():void{
    const formValue =this.loginForm.value;

    console.log(formValue);

    this.login_services.login(formValue).subscribe(res=>{
      if(res){
        this.router.navigate(['home']);
      }
    })
    
 

    // this.subscripcion.add(
    //   this.authService.login(formValue).subscribe((res)=>{
    //     if (res) {
    //       const tokeninfo=helper.decodeToken(res.token)

    //       if (tokeninfo.user.rol="ADMIN") {
    //         this.router.navigate(['']);
    //       }
    //       else if(tokeninfo.user.rol="TRABAJADOR"){
    //         this.router.navigate(['']);
    //       }
    //       console.log("Bienvenido al mejor sistema del GrupoFirma");
    //     }
    //   })
    // );
  }




}