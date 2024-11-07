import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private apiService = inject(ApiService);
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Criação do formulário com validação
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Envio do formulário
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Chama o método do ApiService para registrar o usuário
      this.apiService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro bem-sucedido', response);
        },
        error: (error) => {
          console.error('Erro ao registrar', error);
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
