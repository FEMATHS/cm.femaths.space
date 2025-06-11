import React from "react";
import Section from "../components/Section";
import  Comment  from "../components/Comment";

function IndexComment() {
    return (
        <Section
            title="一些关于小组的评价🥰"
            description="这个页面是对小组的一些评价，欢迎发言😎"
            bannerStyle={{ width: "80%" }}>
            <Comment></Comment>
        </Section>
        
    );
}

export default IndexComment;