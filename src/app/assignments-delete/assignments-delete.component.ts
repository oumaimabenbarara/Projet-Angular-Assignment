import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-assignments-delete',
  templateUrl: './assignments-delete.component.html',
  styleUrls: ['./assignments-delete.component.css']
})
export class AssgnmentsDeleteComponent implements OnInit {
    assignmentTransmis?: Assignment;

  constructor(private route:ActivatedRoute,    
              private notificationService: NotificationService,
              private router:Router,
              private assignmentsService:AssignmentsService,
              public dialogRef: MatDialogRef<AssgnmentsDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    // EXEMPLE RECUPERATION PARAMETRES APRES LE ? Et fragment après le #
    // on appelle ces paramètres les "paramètres HTTP" ou encore les
    // query params (dans nodeJS etc.)
    console.log("Query params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Par exemple Nom = " + this.route.snapshot.queryParams['nom']);
    console.log("Le fragment (après le #) : ");
    console.log(this.route.snapshot.fragment);

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
  onaule(){
    this.dialogRef.close();
  }

  ondel() {
    if (this.assignmentTransmis) {
        this.assignmentsService
          .deleteAssignment(this.assignmentTransmis)
          .subscribe((reponse) => {
            console.log('Réponse du serveur : ' + reponse.message);
  
            // on navigue vers la page d'accueil pour afficher la liste à jour
            this.router.navigate(['/home']);
             this.notificationService.success(':: Supprimer avec succes!!');
          });
        this.assignmentTransmis = undefined;
      }else {
        this.notificationService.warn(':: Element Non Supprimer!!');
      }
      
     
      this.dialogRef.close();
  }
}
