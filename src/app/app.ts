import { AfterViewInit, Component, signal, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';
import { DialogAddEdit } from './Dialogs/dialog-add-edit/dialog-add-edit';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnInit {
  protected readonly title = signal('FronEndCrud');

  displayedColumns: string[] = ['Nombre', 'Departamento', 'Sueldo', 'FechaContracto', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  constructor(
    private _empleadoService: EmpleadoService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.mostrarEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleados() {
    this._empleadoService.getList().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  dialogoNuevoEmpleado() {
    this.dialog.open(DialogAddEdit, {
      disableClose: true,
      width:"350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado === "creado") {
        this.mostrarEmpleados();
      }
    })
  }
}
