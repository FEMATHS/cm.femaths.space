import React from 'react';
import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <Giscus
      repo="FEMATHS/cm.femaths.space"
      repoId="R_kgDOJv5yrg"
      category="Announcements"
      categoryId="DIC_kwDOJv5yrs4Ct4uK"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      lang="zh-CN"
      theme="light_high_contrast"
      darkTheme="dark"
    />
  );
}
