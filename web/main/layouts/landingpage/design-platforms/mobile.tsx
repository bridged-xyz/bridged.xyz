import Image from "next/image";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Flex } from "rebass";
import LiveDesignDemoFrame from "components/landingpage/motion/live-design-demo";
import { media } from "@web/styles/styled/media";
import { ThemeInterface } from "@web/styles/styled/theme";

const renderPlatforms = ["figma", "sketch", "adobexd"];

const DesignPlatformsMobile = () => {
  const [currentPlatform, setCurrentPlatform] = useState("figma");
  return (
    <Positoner>
      <div className="platform-preview">
        <Image
          loading="eager"
          alt="bridged supported design platforms"
          src={`/assets/design-platforms/${currentPlatform}.png`}
          width="auto"
          height="565px"
        />
      </div>
      <PlatformView className="previews">
        <LiveDesignDemoFrame />
        <div className="platforms">
          {renderPlatforms.map(i => (
            <Image
              loading="eager"
              alt="bridged supported platfrom icons"
              key={i}
              className="cursor"
              onClick={() => setCurrentPlatform(i)}
              src={`/assets/platform-icons/${i}/${
                currentPlatform === i ? "default" : "grey"
              }.png`}
              width="24"
              height="24"
            />
          ))}
        </div>
      </PlatformView>
    </Positoner>
  );
};

export default DesignPlatformsMobile;

const Positoner = styled(Flex)`
  position: relative;
  margin-top: 40px;

  .platform-preview {
    transform: translateX(0.5%);
    opacity: 0.6;
    box-shadow: 0px 4px 128px 32px rgba(0, 0, 0, 0.08);

    div {
      width: 507px !important;
      height: 317px !important;
    }
  }
`;

const PlatformView = styled.div`
  position: absolute;
  z-index: 950;
  border-radius: 12px;
  top: 24%;
  transform: translateY(-23.5%);
  margin-left: auto;
  height: 580px;

  .platforms > div {
    width: 24px;
    height: 24px;
    margin-right: 28px !important;
  }

  .platforms {
    margin-top: 20px;
  }

  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[0])} {
    transform: translateY(-10%);
  }
`;
