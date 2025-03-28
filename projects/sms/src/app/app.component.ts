import { KeycloakService, provideKeycloak } from 'keycloak-angular';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent, CommonService } from 'common';
import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MatButtonModule, MatIconModule, MatDividerModule, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sms';
  count = 0;
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  constructor(public commonService: CommonService) {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }

  increment() {
    this.count = this.commonService.increment(this.count);
  }

  signOut() {
    this.keycloak.logout();
  }


}
