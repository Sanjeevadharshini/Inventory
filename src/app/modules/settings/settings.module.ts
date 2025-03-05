import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule { }