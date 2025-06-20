import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';


@Directive()
export abstract class UntilOnDestroyDirective implements OnDestroy {

    protected readonly destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
