import { Routes } from '@angular/router';
import { AllocateComponent } from './pages/allocate/allocate.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path:'', component:HomeComponent
    },
    {
        path:"home", component:HomeComponent
    }
    ,
    {
        path:"allocate", component:AllocateComponent
    }
];
