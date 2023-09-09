import { Component } from '@angular/core';
	
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  clientes: [][];


  cargaArchivo(evt: any){
    /* definir lector de archivos */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if(target.files.length !== 1) throw new Error("No puede cargar multiples archivos");
    const reader: FileReader = new FileReader();
 
    reader.onload = (e: any) => {
      /* leer el libro de trabajo */ 
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      /* agarra la primera hoja */
      const wsname: string = wb.SheetNames[0];      
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]
      console.log(ws);
      /* guardar datos formato json*/ 
      this.clientes = (XLSX.utils.sheet_to_json(ws, {header: 1}))
      console.log(this.clientes)
    };    
    reader.readAsBinaryString(target.files[0]);
  }

}
