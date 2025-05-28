import {Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';


@Component({
    selector: 'jls-category-section',
    host: {role: 'group'},
    imports: [],
    template: `
        <h2 [id]="_id" class="section-title" aria-hidden="true">{{ title }}</h2>
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
                margin: 1rem;
                user-select: none;
                color: var(--mat-sys-primary);
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
