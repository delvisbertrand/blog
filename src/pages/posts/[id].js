import { getGlobalData } from '../../utils/global-data';
import {
  getPostBySlug
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function PostPage({ globalData, post }) {
  return (
    <Layout>
      <SEO
        title={`${post.title} - ${globalData.name}`}
        description={post.description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0" data-sb-object-id={`posts/${post.id}.mdx`}>
        <header>
          <h1 className="mb-12 text-3xl text-center md:text-5xl dark:text-white" data-sb-field-path="title">
            {post.title}
          </h1>
          {post.description && (
            <p className="mb-4 text-xl" data-sb-field-path="description">{post.description}</p>
          )}
        </header>
        <main>
          <article className="prose dark:prose-dark" data-sb-field-path="markdown_content">
            {post.body}
          </article>
        </main>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const post = await getPostBySlug(params.id);
  const globalData = getGlobalData();
  return { props: { globalData, post } };
};
