import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { AuthenticationService } from './services/authentication.service';
import { PermissionsService } from './services/permissions.service';
import { HasAuthorityDirective } from './directives/has-authority.directive';
import { TileComponent } from './components/tile/tile.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './services/shared.service';
import { RouterModule } from '@angular/router';
import { StepSliderComponent } from './components/step-slider/step-slider.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FooterComponent } from './components/footer/footer.component';
import { InputHandlerDirective } from './input-handler.directive';

@NgModule({
  declarations: [
    SharedComponent,
    HasAuthorityDirective,
    TileComponent,
    DataTableComponent,
    HeaderComponent,
    FooterComponent,
    StepSliderComponent,
    InputHandlerDirective
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    RouterModule,
    NgxDatatableModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationService, PermissionsService],
  exports: [
    DataTableComponent,
    TileComponent,
    HeaderComponent,
    StepSliderComponent,
    FooterComponent,
    InputHandlerDirective
  ]
})
export class SharedModule { }
