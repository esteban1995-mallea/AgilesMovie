import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';



import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetallesComponent } from './pages/detalles/detalles.component';


import { PeliculasService } from './services/peliculas.service';
import { UsuariosService } from './services/usuarios.service';
import { LoginService } from './services/login.service';

//schemas
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorsTokenService } from './shared/inteceptors/interceptor-token.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsTokenService, multi: true },
    LoginService,
    PeliculasService,
    UsuariosService,
  ],
  exports: [FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
