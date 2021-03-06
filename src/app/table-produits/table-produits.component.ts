import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';
import { MatDialog } from '@angular/material/dialog';
import { FormulaireProduitsComponent } from '../formulaire-produits/formulaire-produits.component';
import { DialogFormulaireProduitsComponent } from '../dialog-formulaire-produits/dialog-formulaire-produits.component';

@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.css']
})
export class TableProduitsComponent implements OnInit {
  produits: Produit[] = [];
  selectedProduit?: Produit;
  columnsToDisplay = ['nom', 'prix', 'actions'];

  constructor(private produitService: ProduitService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.produitService.getProduits()
      .subscribe(resultat => this.produits = resultat);
  }

  onDelete(produit: Produit): void {
    this.produitService.deleteProduit(produit.id)
      .subscribe(result => this.produits = this.produits.filter(p => p !== produit));
  }

  onSelect(produit?: Produit) {
    if (!produit) {
      this.selectedProduit = { id: '', nom: '', description: '', prix: 0 }
    } else { 
      this.selectedProduit = produit;
    }
    const dialogRef = this.dialog.open(DialogFormulaireProduitsComponent, {
      width: '500px',
      data: this.selectedProduit,
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.selectedProduit = undefined;
      this.getProduits();
    });
  }
}
