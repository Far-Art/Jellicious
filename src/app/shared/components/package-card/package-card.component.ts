import { Component } from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';

@Component({
  selector: 'jls-package-card',
  imports: [
    MatFabButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardImage,
    MatCardFooter,
    MatChipSet,
    MatChip
  ],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss'
})
export class PackageCardComponent {

}
