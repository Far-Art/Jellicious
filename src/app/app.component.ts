import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavBarComponent} from './shared/layout/nav-bar/nav-bar.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAnchor, MatButton} from '@angular/material/button';
import {filter} from 'rxjs';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavBarComponent, FooterComponent, MatSnackBarModule, MatAnchor, MatButton],
    template: `
        <a mat-flat-button class="skip-link" [href]="'#main-content'">דלג לתוכן הראשי</a>
        <jls-nav-bar />
        <router-outlet />
        <jls-footer />
    `,
    styles: [
        `
            :host {
                display: grid;
                grid-template-rows: auto 1fr auto;
                min-height: 100svh;

                .skip-link {
                    position: absolute;
                    right: 1rem;
                    top: -4rem;
                    overflow: hidden;
                    transition: top 100ms ease-in-out;
                    z-index: 1001;
                    padding: 8px 16px;
                    outline: 0.5rem solid;
                }

                .skip-link:focus {
                    top: 1rem;
                }
            }
        `
    ]
})
export class AppComponent implements OnInit {
    title = 'Jellicious';

    private router: Router = inject(Router);

    ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            setTimeout(() => {
                document.documentElement.scrollTo({top: 0});
            })
        });
    }

}
