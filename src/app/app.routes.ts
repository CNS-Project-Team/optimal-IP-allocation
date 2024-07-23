import { Routes } from '@angular/router';
import { AllocateComponent } from './pages/allocate/allocate.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path:"allocate",
        component:AllocateComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"",
        component:HomeComponent
    }
    
];
