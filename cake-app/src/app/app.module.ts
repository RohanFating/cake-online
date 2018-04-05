import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CakeModule } from './cake/cake.module';
import { HttpClient } from '@angular/common/http/src/client';
import { HttpClientModule } from '@angular/common/http/src/module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CakeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
