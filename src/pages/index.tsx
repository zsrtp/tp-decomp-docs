import React from 'react';

import clsx from 'clsx';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import * as progressUtils from '@site/src/progressUtils';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function Block({ title, children }) {
  return (
    <div className={clsx("col", styles.card)}>
      <h2 className="text-hilight">{title}</h2>
      {children}
    </div>
  );
}

export default function Index() {
  const progressText = progressUtils.useCurrentProgressText();
  const ctx = useDocusaurusContext();

  return (
    <Layout description={ctx.siteConfig.tagline}>
      <Head>
        <html className={clsx("container-tp-background")} id={styles.page} />
      </Head>
      <header className={styles.heroBanner}>
        <div className="container">
          <h2 className="hero__title" title="Current decompilation progress">
            <Link to="/progress">
            <span className="text-hilight">{progressText.data || "??.??%"}</span>
            </Link>
          </h2>
          <div className="row">
            <Block title="What is this?">
              <p>This is a reverse engineering project to decompile <i className="text-hilight">Twilight Princess</i> into human-readable and modifiable source code.</p>

              <Link
                className="button button--secondary"
                to="/about">
                Learn more
              </Link>
            </Block>

            <Block title="I want to help">
              <p>We gladly accept contributions! This is a group effort and every contribution helps.</p>

              <Link
                className="button button--secondary"
                to="/contribute">
                Get started
              </Link>
            </Block>
          </div>
        </div>
      </header>
    </Layout>
  );
}
