import { Route, Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
    }
];