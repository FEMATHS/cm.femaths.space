import React from "react";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import MembersTimeline from "@site/src/components/Members/MembersTimeline";
import styles from "./members.module.css";

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
      <main className={styles.membersPage}>
        <div className="container">
          <header className={styles.membersHeader}>
            <span className={styles.eyebrow}>FEMATHS COMMUNITY</span>
            <h1>FEMATHS 小组 · 团队成员</h1>
            <p>认识一起探索计算数学与机器学习的伙伴</p>
          </header>
          <MembersTimeline members={membersData} />
        </div>
      </main>
    </Layout>
  );
}
