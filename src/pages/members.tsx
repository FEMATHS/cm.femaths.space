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
        role: "FEMATHS小组创始人",
        description: "领导团队，负责整体方向",
        avatar: "https://avatars.githubusercontent.com/u/57751257?v=4",
        github: "https://github.com/redhat123456",
        blog: "https://tanger.ltd",
        email: "1907065810@qq.com",
      },
      {
        name: "zqqqj",
        role: "FEMATHS小组成员",
        description: "超级Bug工程师",
        avatar: "https://avatars.githubusercontent.com/u/95482898?v=4",
        github: "https://github.com/zqqqqqqj1110",
        blog: "http://8.130.141.48",
        email: "zhouqijia1110@gmail.com",
      },
      {
        name: "JoyBun",
        role: "FEMATHS小组成员",
        description: "每天都在认真学习",
        avatar: "https://avatars.githubusercontent.com/u/136948208?v=4",
        github: "https://github.com/JoyBun",
        blog: "",
        email: "",
      },
      {
        name: "Xu Guo",
        role: "FEMATHS小组成员",
        description: "一位真正的大佬",
        avatar: "https://avatars.githubusercontent.com/u/161583646?v=4",
        github: "https://github.com/guoX66",
        blog: "",
        email: "",
      },
      {
        name: "Example",
        role: "填写小组职务",
        description: "一段个性化的话",
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
        title="FEMATHS小组成员"
        description="The members directory of the team"
      />
      <main>
        <div style={{ marginTop: '-100px' }} >
          <Section
            title="FEMATHS小组 · 团队成员成员"
            description="这里是我们小组团队成员的简单介绍"
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
