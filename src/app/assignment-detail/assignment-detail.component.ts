import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

import { NotificationService } from '../shared/notification.service';
export interface DialogData {
  id: string;
 
}

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AssignmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    // avant affichage on doit récupérer la valeur du id dans l'URL
    // le "+" force la conversion en number
 
    const id: number = +this.data.id;
    //console.log("ID = " + id);

    // Puis à partir de l'id on demandera au service de nous renvoyer
    // l'assignment correspondant....
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log('Réponse du serveur : ' + reponse.message);

          // on navigue vers la page d'accueil pour afficher la liste à jour
          
          this.notificationService.success(':: Rendu avec succes!!');
      this.dialogRef.close();
          this.router.navigate(['/home']);
        });
    }else {
      this.notificationService.warn(':: Element Non Rendu!!');
    }
  }

 

 

  isAdmin() {
    return this.authService.loggedIn;
  }
}
