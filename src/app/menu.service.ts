import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, Subject} from "rxjs";
import {RouteData} from "./app.routes";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuButtonVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  menuButtonClick: Subject<void> = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe( () => {
      const routerData = activatedRoute.firstChild?.snapshot.data as RouteData;
      this.menuButtonVisible.next(routerData.menuButtonVisible);
    });
  }
}
