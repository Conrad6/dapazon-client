import { Routes } from '@angular/router';
import { StorePageComponent } from './views/store-page/store-page.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: 'store',
        title: 'Store - Dappazon',
        component: StorePageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'store'
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Page or Resource not found - Dappazon'
    }
];
