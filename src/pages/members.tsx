import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";

import MembersTimeline from "@site/src/components/Members/MembersTimeline";
import Section from "@site/src/components/Section";  // 假设路径是这样

import styles from "./styles.module.css";
import ButtonGroup from "antd/lib/button/button-group";

// 成员数据
const membersData = [
  {
    classOf: 2025,
    memberList: [
      {
        name: "Tanger",
        role: "FEMATHS创始人，常务主席",
        description: "领导团队，负责整体方向",
        avatar: "https://avatars.githubusercontent.com/u/57751257?v=4",
        github: "https://github.com/redhat123456",
        blog: "https://tanger.ltd",
        email: "1907065810@qq.com",
      },
      {
        name: "zqqqj",
        role: "FEMATHS法人兼财务",
        description: "超级Bug工程师",
        avatar: "https://avatars.githubusercontent.com/u/95482898?v=4",
        github: "https://github.com/zqqqqqqj1110",
        blog: "https://davidblog.com",
        email: "david@example.com",
      },
      {
        name: "Lily",
        role: "前端工程师",
        description: "负责前端开发和交互设计",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        github: "https://github.com/lily",
        blog: "https://lilyblog.com",
        email: "lily@example.com",
      },
      {
        name: "Lily",
        role: "前端工程师",
        description: "负责前端开发和交互设计",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        github: "https://github.com/lily",
        blog: "https://lilyblog.com",
        email: "lily@example.com",
      },
      {
        name: "Lily",
        role: "前端工程师",
        description: "负责前端开发和交互设计",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        github: "https://github.com/lily",
        blog: "https://lilyblog.com",
        email: "lily@example.com",
      },
    ],
  },
];

export default function Members(): JSX.Element {
  return (
    <Layout>
      <PageMetadata
        title="Our Members"
        description="The members directory of the team"
      />
      <main>
        <div style={{ marginTop: '-100px' }} >
          <Section
            title="我们的小组成员"
            description="这里是我们团队的详细成员介绍"
            bannerStyle={{  }}
          >
            <div className={styles.content}>
              <MembersTimeline members={membersData} />
            </div>
          </Section>
        </div>
      </main>
    </Layout>
  );
}
