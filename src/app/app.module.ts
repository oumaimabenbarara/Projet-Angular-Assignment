import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort'
import{MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AssgnmentsDeleteComponent } from './assignments-delete/assignments-delete.component';
import { AuthenComponent } from './authen/authen.component';


const routes: Routes = [
  {
    path:'',
    component:AuthenComponent
  },
  {
    path:'authen',
    component:AuthenComponent
  },
  {
    path:"home",
    component:AssignmentsComponent
  },
  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component:EditAssignmentComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"assignment/:id/delete",
    component:AssgnmentsDeleteComponent,
    
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssgnmentsDeleteComponent,
    AuthenComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    BrowserAnimationsModule, MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule, MatTableModule,
    RouterModule.forRoot(routes), HttpClientModule,
    MatToolbarModule,MatSortModule, 
    MatDialogModule,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddAssignmentComponent]
})
export class AppModule { }
