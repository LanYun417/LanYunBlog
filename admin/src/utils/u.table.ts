import * as XLSX from 'xlsx';

/**
 * 导出表格
 * @param tableDom table dom
 */
export function exportTable(tableDom: any) {
  if (!tableDom) throw new Error('`tableDom` is required!');

  const wb = XLSX.utils.table_to_book(tableDom.$el);
  XLSX.writeFile(wb, `${Date.now()}.xlsx`);
}
