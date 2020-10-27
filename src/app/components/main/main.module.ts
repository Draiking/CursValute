import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent,
    HeaderComponent
  ]
})
export class MainModule { }
