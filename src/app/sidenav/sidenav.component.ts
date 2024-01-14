import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MenuService} from "../menu.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = false;
  menuButtonClickSubscription?: Subscription;


  constructor(private breakpointObserver: BreakpointObserver, private menuService: MenuService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });

    this.menuButtonClickSubscription = this.menuService.menuButtonClick.subscribe(() => this.toggleMenu());
  }

  ngOnDestroy(): void {
    this.menuButtonClickSubscription?.unsubscribe()
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
