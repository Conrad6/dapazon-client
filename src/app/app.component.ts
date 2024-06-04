import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly clicks = signal(0);

  onButtonClicked() {
    this.clicks.update(v => v + 1);
  }
  constructor(primeConfig: PrimeNGConfig) {
    primeConfig.ripple = true;
  }
}
