import React from 'react';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItems from '@theme/BlogPostItems';
import type { Props } from '@theme/BlogListPage';

export default function BlogListPage(props: Props): JSX.Element {
  const { metadata, items, sidebar } = props;

  // 按 priority 排序，默认没有 priority 的放后面
  const sortedItems = items.slice().sort((a, b) => {
    const aPriority = a.content.frontMatter.priority ?? 9999;
    const bPriority = b.content.frontMatter.priority ?? 9999;
    return aPriority - bPriority;
  });

  return (
    <BlogLayout title={metadata.blogTitle} description={metadata.blogDescription} sidebar={sidebar}>
      <BlogPostItems items={sortedItems} />
    </BlogLayout>
  );
}
