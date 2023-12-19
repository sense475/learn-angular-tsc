import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: 'budget/requirements', component: RequirementEntryComponent },
    // {
    //     path: 'budget/requirements',
    //     loadComponent:() => import('./features/budget/pages/requirement-entry/requirement-entry.component').then(c => c.RequirementEntryComponent) 
    // },
    // {
    //     path: 'budget/requirements/add',
    //     loadComponent: () => 
    //         import('./features/budget/pages/requirement-form/requirement-form.component').then(c => c.RequirementFormComponent)
    // }

    {
        path: 'budget',
        loadChildren: () => import('./features/budget/budget.routes')
    }

];
