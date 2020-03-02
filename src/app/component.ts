import { TabsPortailComponent } from './tabs-portail/tabs-portail.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
@NgModule({
    declarations: [TabsPortailComponent],
    imports: [IonicModule, CommonModule],
    exports: [TabsPortailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule {}