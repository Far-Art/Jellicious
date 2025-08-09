import {Component, Input} from '@angular/core';
import {NavItem} from '../nav-bar.component';
import {MatButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';


@Component({
    selector: 'jls-menu-button',
    imports: [MatButton, MatBadge],
    template: `
        <button role="menuitem" color="primary" mat-button (click)="navItem.click()">
            <div class="button-label">
                <span [matBadgeDescription]="badge?.description || ''" matBadgePosition="above before" [matBadgeHidden]="badge?.value == 0" [matBadge]="badge ? badge.value : null" class="material-symbols-outlined" aria-hidden="true">{{ navItem.icon }}</span>
                <span>{{ navItem.label }}</span>
            </div>
        </button>
    `,
    styles: [
        `
            :host {
                display: inline-block;

                button {
                    margin-inline: 0.5rem;
                    --mat-badge-text-color: white;
                    --mat-badge-text-weight: bold;
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

            @media screen and (max-width: 480px) {
                :host.dynamic {

                    --mat-button-text-container-height: 60px;

                    .button-label {
                        flex-direction: column;
                        white-space: nowrap;
                    }
                }
            }
        `
    ]
})
export class MenuButtonComponent {

    @Input({required: true}) navItem!: NavItem;

    @Input() badge: { value: string | number, description: string } | null = null;

}
