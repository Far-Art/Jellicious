import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export type ControlFor<T> =
// if already control, skip
    T extends AbstractControl ? T :
        // if boolean, assign to boolean
        T extends boolean ? FormControl<boolean> :
            // if array, assign to FormArray
            T extends any[] ? FormArray<ControlFor<T[number]>> :
                // if object, assign to FormGroup
                T extends object ? FormGroup<{ [K in keyof T]: ControlFor<T[K]> }>
                    : FormControl<T>;