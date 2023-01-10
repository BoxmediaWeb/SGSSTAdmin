import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { FileService } from 'app/servicios/file.service';
import { environment } from 'environments/environment';
import { filter, Observable } from 'rxjs';
import { PlanearComponent } from '../planear/planear.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {
  documento=this.route.snapshot.paramMap.get('documento');
  maestroIndice=this.route.snapshot.paramMap.get('id');
  dataMaestroDocumento: any = [];
  ruta="http://127.0.0.1:8000/detalle_documento/E1.1.1_TJTNSk88Tk.pdf#zoom=90&pagemode=none&scrollbar=0&toolbar=0&statusbar=1&messages=0&navpanes=0";

  urlRegresar=`${environment.serverUrl}/detalle_documento/${this.documento}`;

  objectUrl:any;

  constructor(
    private route: ActivatedRoute,
    private _httpClient: HttpClient,
    private _planearComponent: PlanearComponent,
    private _apiService: ApiService,
    private router: Router,
    private _fileService: FileService,
    private _router:Router,
    ) {

  }

  toggleDrawer(): void
  {
    // Toggle the drawer
    this._planearComponent.matDrawer.toggle();
  }

  getMaestroDocumento(){
    const nombreQuery ='maestroDocumento';
    const queryParams=`ubicacion:"${this.maestroIndice}"`;
    const queryProps='id,nombre,codigo,ubicacion';
  
    this._apiService.getData(queryProps,queryParams,nombreQuery).
    subscribe((response) => {
        this.dataMaestroDocumento = response.data.maestroDocumento[0];
        //this.dataNombre = response.data.maestroDocumento[0].nombre;
     });
  }

  selectCotizacion() {
    this.router.navigate([`/planear/indice/${this.maestroIndice}`]);
  }

  /*
  returnPdf(): void {
    this._fileService
      .download()
      .subscribe(blob => {
        this.objectUrl = URL.createObjectURL(blob);
      })
  }*/

  ngOnInit(): void {
    this.getMaestroDocumento();
    this.dataMaestroDocumento;
  }

}
