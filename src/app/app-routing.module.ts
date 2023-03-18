import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuitarAmpComponent } from './components/Effects/guitar-amp/guitar-amp.component';

const routes: Routes = [
  { path: '', component: GuitarAmpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
