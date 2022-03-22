import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  height: number;
  weight: number;
}

export const tableData = [
  { position: 1, name: 'Rose', height: 178, weight: 43 },
  { position: 2, name: 'Benny', height: 156, weight: 90 },
  { position: 3, name: 'Sam', height: 167, weight: 55 },
  { position: 4, name: 'Peggy', height: 183, weight: 55 },
  { position: 5, name: 'Claire', height: 163, weight: 73 },
  { position: 6, name: 'Jason', height: 180, weight: 67 }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  // table 資料
  dataSource = new MatTableDataSource<any>();

  // table標題
  displayedColumns = ['position', 'name', 'height', 'weight'];

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      //顯示資料
      this.showData(tableData);
    }, 0);
  }

  //顯示資料
  showData(data: any) {
    this.dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.dataSource.sort = this.sort;// 設定資料排序
    this.dataSource.paginator = this.paginator;// 設定分頁器
  }

  // 設定分頁器參數
  setPaginator() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }

}
