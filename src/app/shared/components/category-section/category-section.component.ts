import {Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StickyScrollDirective} from '../../directives/sticky-scroll.directive';


@Component({
    selector: 'jls-category-section',
    host: {role: 'group'},
    imports: [
        StickyScrollDirective
    ],
    template: `
        <div jlsStickyScroll class="section-title-container">
            <h2 [id]="_id" class="section-title" aria-hidden="true">{{ title }}</h2>
        </div>
        <section class="grid-auto-fill">
            <ng-content />
        </section>
    `,
    styles: [
        `
            .grid-auto-fill {
                --grid-gap: 2rem;

                margin-inline: 2rem;
            }

            .section-title-container {
                top: var(--nav-bar-height);
                z-index: 2;
                padding: 1rem 0.5rem;

                .section-title {
                    position: relative;
                    font-size: 2rem;
                    user-select: none;
                    color: var(--mat-sys-primary);
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
