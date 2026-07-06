export type BlogMeta = {
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
  slug?: string;
  [key: string]: unknown;
};

export type BlogPost = BlogMeta & {
  slug: string;
  folder: string;
  content: string;
  markdownPath: string;
  metaPath: string;
};

const markdownFiles = import.meta.glob<string>("../data/blog/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const metaFiles = import.meta.glob<BlogMeta>("../data/blog/*/*.json", {
  import: "default",
  eager: true,
});

function keyOf(path: string) {
  const match = path.match(/\/([^/]+)\/([^/]+)\.(md|json)$/);
  if (!match || match[1] !== match[2]) return null;
  return match[1];
}

export const BLOG_POSTS: BlogPost[] = Object.entries(markdownFiles)
  .flatMap(([markdownPath, content]) => {
    const slug = keyOf(markdownPath);
    if (!slug) return [];

    const metaEntry = Object.entries(metaFiles).find(([metaPath]) => keyOf(metaPath) === slug);
    if (!metaEntry) return [];

    const [metaPath, meta] = metaEntry;
    if (meta.draft) return [];

    return [{
      ...meta,
      slug: meta.slug ?? slug,
      folder: slug,
      content,
      markdownPath,
      metaPath,
    }];
  })
  .sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
