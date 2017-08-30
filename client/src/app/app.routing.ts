import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import artist
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from "./components/artist-detail.component";

//import Home componente
import { HomeComponent } from './components/home.component';

//import Albums
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from "./components/album-edit.component";
import { AlbumDetailComponent } from "./components/album-detail.component";


const appRoutes: Routes = [
    /* {
        path:'',
        redirectTo: '/artists/1',
        pathMatch: 'full'
    }, */
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'artista/:id', component: ArtistDetailComponent},
    {path: 'artistas/:page', component: ArtistListComponent},
    {path: 'crear-artista', component: ArtistAddComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'crear-album/:artist', component: AlbumAddComponent},
    {path: 'album/:id', component: AlbumDetailComponent},
    {path: 'editar-album/:id', component: AlbumEditComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingPoviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);