import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { NotificationService } from '../shared/notification.service';

export interface DialogData {
  id: string;
 
}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})

export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  nomAssignment:string = "";
  dateDeRendu?:Date = undefined;
 

  constructor(private assignmentService:AssignmentsService,private route: ActivatedRoute,
    private notificationService: NotificationService,
              private router:Router, public dialogRef: MatDialogRef<AddAssignmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.dateDeRendu);

    if(this.nomAssignment && this.dateDeRendu) {
      let newAssignment = new Assignment();

      newAssignment.nom = this.nomAssignment;
      newAssignment.dateDeRendu = this.dateDeRendu;
      newAssignment.rendu = false;
      newAssignment.id = Math.round(Math.random() * 1000000);

      this.assignmentService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log("réponse du serveur : " + reponse.message);

        // ICI par programme, je vas naviguer vers la page qui affiche la liste
        // je ne peux pas le faire en dehors du subscribe
        // car il n'y a que dans le subscribe que je suis sur que l'assignment
        // a bien été ajouté (ça peut prendre du temps si on utilise une BD distante)
       
      });
      this.notificationService.success(':: Ajouter avec succes!!');
    this.dialogRef.close();
    }else {
      this.notificationService.warn(':: Element Non Ajouter!!');
    }
    this.router.navigate(["/home"]);
    const id: number = +this.data;
    console.log("Tap"+this.data.id);
  }

}
