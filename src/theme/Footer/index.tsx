/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';
import {FooterLinkItem, useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function FooterLink({
  to,
  href,
  label,
  prependBaseUrlToHref,
  ...props
}: FooterLinkItem) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className={clsx('footer__link-item', styles.footerLink)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  const logo = useBaseUrl('/img/favicon.ico');

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx(styles.footer, {
        [styles.footerDark]: footer.style === 'dark',
      })}>
      <div className={clsx('container', styles.footerContainer)}>
        <div className={styles.footerMain}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandHeading}>
              <img src={logo} alt="" className={styles.brandLogo} />
              <span>FEMATHS 小组</span>
            </Link>
            <p className={styles.brandDescription}>
              计算数学 × 机器学习
              <br />
              用简单的努力，积累不平凡的价值
            </p>
            <p className={styles.brandNote}>论文精读 · Wiki 知识库 · 学习日志</p>
          </div>

          <div className={styles.footerLinks}>
            {footer.links?.map((linkGroup, index) => (
              <nav key={linkGroup.title ?? index} aria-label={linkGroup.title ?? 'Footer'}>
                {linkGroup.title && <h2 className={styles.footerTitle}>{linkGroup.title}</h2>}
                <ul className={styles.linkList}>
                  {linkGroup.items?.map((item, itemIndex) => (
                    <li key={item.href ?? item.to ?? itemIndex}>
                      {item.html ? (
                        <span dangerouslySetInnerHTML={{__html: item.html}} />
                      ) : (
                        <FooterLink {...item} />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>{footer.copyright}</span>
          <span>FEMATHS · 计算数学与机器学习</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
