import { Routes } from '@angular/router';
import {EmptyComponent} from "./empty/empty.component";
import {SidenavComponent} from "./sidenav/sidenav.component";

export class RouteData {
  menuButtonVisible: boolean;


  constructor(menuButtonVisible: boolean) {
    this.menuButtonVisible = menuButtonVisible;
  }
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'empty',
    pathMatch: 'full'
  },
  {
    path: "sidenav",
    component: SidenavComponent,
    data: new RouteData(true)
  },
  {
    path: "empty",
    component: EmptyComponent,
    data: new RouteData(false)
  }
];
