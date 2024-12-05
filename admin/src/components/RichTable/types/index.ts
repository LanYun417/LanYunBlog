// 表格字段类型定义
export interface TableField {
  type: ColumnType; // 字段类型
  label: string; // 表头显示文字
  prop: string; // 字段名
  width?: string | number; // 列宽
  sortable?: boolean; // 是否可排序
  visibled?: boolean; // 是否显示字段（默认 true）
}

export type ColumnType = 'text' | 'image' | 'tag' | 'link';

export type TableFields = TableField[];
