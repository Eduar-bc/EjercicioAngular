import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS, MatOption } from '@angular/material/core';
import { EmpleadoService } from '../../Services/empleado.service';
import { DepartamentoService } from '../../Services/departamento.service';
import { Departamento } from '../../Interfaces/departamento';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Empleado } from '../../Interfaces/empleado';

import _moment from 'moment';

const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-add-edit',
  imports: [
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatInputModule,
    MatButton,
    MatDialogClose,
    MatSelectModule,
    MatOption,
    MatDatepickerModule,
    MatIconModule,
    MomentDateModule,
  ],
  templateUrl: './dialog-add-edit.html',
  styleUrl: './dialog-add-edit.css',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMATS,
    },
  ],
})
export class DialogAddEdit implements OnInit {
  formEmpleado: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  listaDepartamentos: Departamento[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEdit>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _departamentoService: DepartamentoService,
    private _empleadoService: EmpleadoService,
  ) {
    this.formEmpleado = this.fb.group({
      nombreCompleto: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      sueldo: ['', Validators.required],
      fechaContrato: ['', Validators.required],
    });

    this._departamentoService.getList().subscribe({
      next: (data) => {
        this.listaDepartamentos = data;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addEditEmpleado() {
    const modelo: Empleado = {
      idEmpleado: 0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: _moment( this.formEmpleado.value.fechaContrato).format('DD/MM/YYYY')
    };
    this._empleadoService.add(modelo).subscribe({
      next: (data) => {
        this.mostrarAlerta(`Empleado creado con éxito`, 'Listo');
        this.dialogoReferencia.close('creado');
      },error:(e) =>{
        this.mostrarAlerta(`No se pudo crear el empleado`, 'Error');
      }
    })
  }

  ngOnInit(): void {}
}
