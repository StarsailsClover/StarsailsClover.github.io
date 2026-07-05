import text from "@/data/text.json";

export type TextConfig = typeof text;
export const TEXT: TextConfig = text;

/**
 * 简单模板替换：将 {key} 占位符替换为 vars 中对应字段。
 * 用法：fmt(TEXT.identity.joinedTemplate, { year: 2026 })
 */
export function fmt(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = vars[key];
    return v === undefined || v === null ? `{${key}}` : String(v);
  });
}
