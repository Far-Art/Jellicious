import {Component, Input} from '@angular/core';
import {NavItem} from '../nav-bar.component';
import {MatButton} from '@angular/material/button';


@Component({
    selector: 'jls-menu-button',
    imports: [MatButton],
    template: `
        <button role="menuitem" color="primary" mat-button (click)="navItem.click()">
            <div class="button-label">
                <span class="material-symbols-outlined" aria-hidden="true">{{ navItem.icon }}</span>
                <span>{{ navItem.label }}</span>
            </div>
        </button>
    `,
    styles: [`
        :host {
            display: contents;

            button {
                margin-inline: 0.5rem;
            }

            .button-label {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
            }

            .material-symbols-outlined {
                font-size: 1.7rem;
            }
        }
    `]
})
export class MenuButtonComponent {

    @Input({required: true}) navItem!: NavItem;

}
