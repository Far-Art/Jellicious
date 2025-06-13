import {Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';


@Component({
    selector: 'jls-category-section',
    host: {role: 'group'},
    imports: [],
    template: `
        <h2 [id]="_id" class="section-title sticky mat-elevation-z24" aria-hidden="true">{{ title }}</h2>
        <section class="grid-auto-fill">
            <ng-content />
        </section>
    `,
    styles: [
        `
            .grid-auto-fill {
                --grid-gap: 2rem;
            }

            .section-title {
                position: sticky;
                top: var(--nav-bar-height);
                z-index: 2;
                font-size: 2rem;
                padding: 1rem 0.5rem;
                user-select: none;
                color: var(--mat-sys-primary);
                
                &.sticky {
                    background-color: hsl(from var(--mat-sys-on-tertiary-fixed) h s l / .5);
                    backdrop-filter: blur(20px);
                }
            }
        `
    ]
})
export class CategorySectionComponent implements OnChanges {

    @Input({required: true}) title!: string;

    @Input({
        required: true,
        alias: 'id'
    }) _id!: string;

    @HostBinding('attr.aria-label') ariaLabel!: string;

    ngOnChanges(_: SimpleChanges): void {
        this.ariaLabel = `סקציה של ${this.title}`;
    }

}
