import { marked } from 'marked';
import * as cheerio from 'cheerio';

/**
 * 将 Markdown 文本转换为纯文本
 * @param { string } markdownText Markdown 文本
 */
export function markdownToText(markdownText: string): string {
	const html = marked(markdownText).toString();
	console.log('html: ', html);

	const $ = cheerio.load(html);
	return $('body').text();
}
