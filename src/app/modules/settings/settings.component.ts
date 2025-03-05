import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  companyLogo: string | null = null; // Store base64 string of the logo
  logoPreview: string | null = null; // For displaying preview

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      companyInfo: [''],
      currency: ['USD', Validators.required],
      stockAlertThreshold: [10, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      this.settingsForm.patchValue(parsedSettings);
      this.companyLogo = parsedSettings.companyLogo || null;
      this.logoPreview = this.companyLogo;
    }
  }

  onLogoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.companyLogo = reader.result as string;
        this.logoPreview = this.companyLogo;
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.companyLogo = null;
    this.logoPreview = null;
    const logoInput = document.getElementById('companyLogo') as HTMLInputElement;
    if (logoInput) logoInput.value = '';
  }

  onSubmit() {
    if (this.settingsForm.invalid) {
      Swal.fire('Error', 'Please fill out all required fields correctly.', 'error');
      return;
    }

    const settingsData = {
      ...this.settingsForm.value,
      companyLogo: this.companyLogo
    };
    localStorage.setItem('settings', JSON.stringify(settingsData));
    Swal.fire('Success', 'Settings saved successfully.', 'success');
    this.router.navigate(['/dashboard']);
  }
}