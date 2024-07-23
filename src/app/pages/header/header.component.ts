import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //import
import { Router, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { filter } from 'rxjs/operators'; // Import filter operator
import { Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],//import common module
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  activeLink: string | null = null;

  setActiveLink(link: string) {
    this.activeLink = link;
    console.log("set",link);
  }

  constructor(private router: Router) {
    // Track route changes to update activeLink
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveLink();
    });
  }

  updateActiveLink() {
    this.activeLink = this.router.url.substring(1); // Remove leading '/'
    console.log("update",this.activeLink);
    
  }
}
