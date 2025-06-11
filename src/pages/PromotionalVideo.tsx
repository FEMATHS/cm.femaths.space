import React from "react";
import Section from "../components/Section";
import  Video  from "../components/Video";

function PromotionalVideo() {
    return (
        <Section
            title="部分成果展示视频"
            description="可以通过该视频来了解我们小组，希望能帮助到您了解我们小组😋"
            bannerStyle={{ width: "80%" }}>
            <Video></Video>
        </Section>
    );
}

export default PromotionalVideo;
