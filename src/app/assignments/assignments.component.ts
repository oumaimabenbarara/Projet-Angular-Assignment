import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddAssignmentComponent } from '../add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment.component';
import { AssgnmentsDeleteComponent } from '../assignments-delete/assignments-delete.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  couleur = 'violet';
  // Pour la pagination
  page: number = 1;
  limit: number = 5;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  // pour l'affichage en table
  displayedColumns: string[] = ['demo-id', 'demo-nom', 'demo-dateDeRendu', 'demo-rendu','actions'];

  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentsService,private authService:AuthService,
    private dialog :MatDialog,private router:Router) {
    
  }

  ngOnInit(): void {
    // appelé AVANT l'affichage (juste après le constructeur)
    console.log('AVANT AFFICHAGE');
    // on va demander au service de nous renvoyer les données (les assignments)
    // typiquement : le service envoie une requête AJAX sur un web service
    // du cloud...

    this.getAssignments();
  }

  getAssignments() {
    console.log('On demande les assignments au service');
    this.assignmentService
      .getAssignmentsPagine(this.page, this.limit)
      .subscribe((data) => {
        // quand on rentre ici on sait que les données sont prêtes
        console.log('données reçues');
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
      });

    console.log('demande envoyée au service');
  }



  pageSuivante() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.getAssignments();
    }
  }

  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.getAssignments();
    }
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  oncreate() {
    let useID="1";
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '25%',
      data: {id: useID}
    }).afterClosed()
    .subscribe(() => this.getAssignments());

       
  }
  ondelete(id:number) 
  {
    let useID=id;
    const dialogRef = this.dialog.open(AssgnmentsDeleteComponent, {
      width: '25%',
      data: {id: useID}
    }).afterClosed()
    .subscribe(() => this.getAssignments());
  }

  ondetail(id:number)
  {
    let useID=id;
    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      width: '25%',
      data: {id: useID}
    }).afterClosed()
    .subscribe(() => this.getAssignments());
  }
  onupdate(id:number)
  {
    let useID=id;
    const dialogRef = this.dialog.open(EditAssignmentComponent, {
      width: '25%',
      data: {id: useID}
    }).afterClosed()
    .subscribe(() => this.getAssignments());
  }
  decon(){
        this.authService.logOut();
        this.router.navigate(["/authen"]);
   
    
  }
}
