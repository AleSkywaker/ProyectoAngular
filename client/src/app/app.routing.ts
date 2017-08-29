import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import artist
import { ArtistListComponent } from './components/artist-list.component';

//import Home componente
import { HomeComponent } from './components/home.component';

//import Añadir Artista
import { ArtistAddComponent } from './components/artist-add.component';

//import Edicion Artista
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from "./components/artist-detail.component";



const appRoutes: Routes = [
    /* {
        path:'',
        redirectTo: '/artists/1',
        pathMatch: 'full'
    }, */
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'crear-artista', component: ArtistAddComponent},
    {path: 'artista/:id', component: ArtistDetailComponent},
    {path: 'artistas/:page', component: ArtistListComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingPoviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);