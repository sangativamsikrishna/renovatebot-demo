import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[appHasAuthority]'
})
export class HasAuthorityDirective {
  private authorities: string[];

  // constructor(
  //   private readonly templateRef: TemplateRef<any>,
  //   private readonly viewContainerRef: ViewContainerRef,
  //   private readonly permissionService: PermissionsService
  // ) {}

  // @Input()
  // set HasAnyAuthority(value: string | Array<string>) {
  //   this.authorities = typeof value === 'string' ? [value] : value;

  //   if (this.permissionService.hasAccess(this.authorities)) {
  //     this.updateView(true);
  //   }
  // }

  // private updateView(hasAccess: boolean): void {
  //   this.viewContainerRef.clear();
  //   if (hasAccess) {
  //     this.viewContainerRef.createEmbeddedView(this.templateRef);
  //   }
  // }
}
