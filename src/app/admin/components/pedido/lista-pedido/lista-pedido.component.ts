import { Component } from '@angular/core';
import { PedidoService } from 'src/app/core/services/pedido.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.scss'],
})
export class ListaPedidoComponent {
  pedidos: any[] = [];

  visible: boolean = false;

  pedido: any = {};

  constructor(private pedidoService: PedidoService) {
    this.listaPedidos();
  }

  listaPedidos() {
    this.pedidoService.listar().subscribe((res: any) => {
      this.pedidos = res.data;
    });
  }

  showDialog(pedido) {
    this.visible = true;
    this.pedido = pedido;
  }

  calcularSubtotal(): number {
    if (this.pedido.id) {
      return this.pedido.productos.reduce((subtotal, producto) => {
        return subtotal + parseFloat(producto.precio) * producto.pivot.cantidad;
      }, 0);
    }
    return 0;
  }

  calcularImpuesto(subtotal: number, impuestoPorcentaje: number): number {
    return (subtotal * impuestoPorcentaje) / 100;
  }

  calcularTotal(subtotal: number, impuesto: number): number {
    return subtotal + impuesto;
  }

  generarPDF(recibo) {
    const doc = new jsPDF();

    // Encabezado del recibo
    doc.setFontSize(18);
    doc.text('Recibo de Pedido', 10, 10);

    // Detalles del pedido
    doc.setFontSize(12);
    doc.text('Código de Pedido: ' + recibo.cod_pedido, 10, 30);
    doc.text('Fecha: ' + recibo.fecha, 10, 40);
    // Agrega más detalles según sea necesario

    // Tabla de Productos
    const headers = [['Producto', 'Precio', 'Cantidad', 'Subtotal']];
    const productos = recibo.productos.map((producto) => {
      const subtotal = parseFloat(producto.precio) * producto.pivot.cantidad;
      return [
        producto.nombre,
        `$${producto.precio}`,
        producto.pivot.cantidad,
        `$${subtotal.toFixed(2)}`,
      ];
    });

    const startY = 60;
    autoTable(doc, {
      head: headers,
      body: productos,
      startY: 60,
      styles: {
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
      },
      theme: 'striped',
    });

    // Resumen del pedido
    const subtotal = productos.reduce(
      (acc, curr) => acc + parseFloat(curr[3].replace('$', '')),
      0
    );
    const impuesto = (subtotal * 0.12).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(impuesto)).toFixed(2);

    doc.setFontSize(12);
    doc.text('Subtotal: $' + subtotal, 10, (50 + (recibo.productos.length*30)) + 10);
    doc.text('Impuesto (IVA 12%): $' + impuesto, 10, (50 + (recibo.productos.length*30)) + 20);
    doc.text('Total: $' + total, 10, (50 + (recibo.productos.length*30)) + 30);

    doc.save('recibo.pdf');
  }

  calcularSubtotalPDF(productos: any[]): number {
    return productos.reduce((subtotal, producto) => {
      return subtotal + parseFloat(producto.precio) * producto.pivot.cantidad;
    }, 0);
  }

  calcularImpuestoPDF(subtotal: number, impuestoPorcentaje: number): number {
    return (subtotal * impuestoPorcentaje) / 100;
  }

  calcularTotalPDF(subtotal: number, impuesto: number): number {
    return subtotal + impuesto;
  }

  exportarArchivo(){
    /* generar una hoja de trabajo */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pedidos);
    /* generar libro de trabajo y agregar la hoja de trabajo */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* guardar en archivo */
    XLSX.writeFile(wb, 'datos.xlsx');
  }
}
