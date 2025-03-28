import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  readonly label = input<string>(''); // Accepts a label value
  readonly render = input<any>(''); // Accepts a boolean value
}
