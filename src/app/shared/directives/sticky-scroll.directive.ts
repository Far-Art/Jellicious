import {AfterViewInit, Directive, ElementRef, HostBinding} from '@angular/core';
import {UntilOnDestroyDirective} from './until-on-destroy.directive';
import {distinctUntilChanged, fromEvent, map, takeUntil, throttleTime} from 'rxjs';


@Directive({
    selector: '[jlsStickyScroll]'
})
export class StickyScrollDirective extends UntilOnDestroyDirective implements AfterViewInit {

    @HostBinding('class.scrolling') isScrolling = false;

    private thresholdPx = 0;

    constructor(private el: ElementRef<HTMLElement>) {
        super();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.thresholdPx = this.el.nativeElement.getBoundingClientRect().top);
        fromEvent(window, 'scroll').pipe(
            takeUntil(this.destroy$),
            throttleTime(5),
            map(() => window.pageYOffset > 10 && this.el.nativeElement.getBoundingClientRect().top <= this.thresholdPx),
            distinctUntilChanged()
        ).subscribe(value => {
            this.isScrolling = value;
        });

    }

}
