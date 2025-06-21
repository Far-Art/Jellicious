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
            <div class="section-title-background"></div>
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
                position: sticky;
                top: var(--nav-bar-height);
                z-index: 2;
                padding: 1rem 0.5rem;

                .section-title {
                    position: relative;
                    font-size: 2rem;
                    user-select: none;
                    color: var(--mat-sys-primary);
                }

                &.scrolling > .section-title-background {
                    opacity: 1;
                }

                .section-title-background {
                    --shadow-color: hsl(308deg 60% 8% / 20%);

                    opacity: 0;
                    position: absolute;
                    inset: 0;
                    right: -50vw;
                    width: 150vw;
                    background-color: hsl(from var(--mat-sys-on-tertiary-fixed) h s l / .65);
                    backdrop-filter: blur(25px);
                    box-shadow: 1px 2px 2px var(--shadow-color),
                    2px 4px 4px var(--shadow-color),
                    4px 8px 8px var(--shadow-color),
                    8px 16px 16px var(--shadow-color),
                    16px 32px 32px var(--shadow-color);
                    
                    transition: opacity 100ms ease-in-out;
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
