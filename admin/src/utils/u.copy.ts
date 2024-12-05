import { throttle } from 'lodash';
import { ElMessage } from 'element-plus';

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 */
function t_copyToClipboard(text: string): void {
  // 创建一个不可见的文本区域元素
  const textarea = document.createElement('textarea');

  // 设置文本区域的值为要复制的文本
  textarea.value = text;

  // 将文本区域元素添加到文档中
  document.body.appendChild(textarea);

  // 选择文本区域中的文本
  textarea.select();

  // 执行复制命令
  document.execCommand('copy');

  // 移除文本区域元素
  document.body.removeChild(textarea);

  ElMessage.success('复制成功');
}
export const copyToClipboard = throttle(t_copyToClipboard, 500);
