import React, { useState, useEffect, createRef } from "react";
import SectionLayout from "@web/layouts/section";
import { Flex, Heading, Text } from "rebass";
import styled from "@emotion/styled";
import { media } from "@web/styles/styled/media";
import BlankArea from "components/blank-area";
import { ThemeInterface } from "@web/styles/styled/theme";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCT_LIST } from "utils/landingpage/constants";
import ReactPlayer from "react-player";
import LandingpageText from "components/landingpage/text";

// region video framer motion values
const videoPlayerMotionAnimationVariants = {
  loading: { opacity: 0, delay: 0, default: { duration: 1 } },
  loaded: { opacity: 1, delay: 0, default: { duration: 1 } },
};
// endregion video framer motion values

const Products = () => {
  const [x, setX] = useState<number>(0);
  const [beforeClick, setBeforeClick] = useState<number>(0);
  const [counter, setCounter] = useState(1);
  const [isVideoPlayerReady, setIsVideoPlayerReady] = useState(false);
  const [elWidth, setElWidth] = useState([]);

  const elRefs = React.useRef([]);
  const spring = {
    type: "spring",
    stiffness: 200,
    damping: 25,
  };

  useEffect(() => {
    const timer =
      counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    elRefs.current = Array(PRODUCT_LIST.length)
      .fill(null)
      .map((_, i) => elRefs.current[i] || createRef());
  }, []);

  useEffect(() => {
    if (elRefs.current[0].current !== null) {
      setElWidth(
        elRefs.current.map(innerElRef => innerElRef.current.offsetWidth + 30),
      );
    }
  }, [beforeClick, counter]);

  function handleTabSelectionChange(current: number) {
    let targetSize = 0;
    if (beforeClick < current) {
      elWidth.map((size, elIndex) => {
        if (current == 0) {
          setX(0);
        } else if (current > elIndex) {
          targetSize += size;
        }
      });
      setX(-targetSize);
    } else if (beforeClick > current) {
      elWidth.map((size, elInedx) => {
        if (current == 0) {
          setX(0);
        } else if (current == elInedx) {
          setX(x + size);
        }
      });
    }
    setBeforeClick(current);
    setIsVideoPlayerReady(false);
  }

  return (
    <SectionLayout alignContent="start">
      <LandingpageText variant="h2">Your design is your</LandingpageText>
      <SectionLayout
        className="gradient-row-tab"
        variant="content-overflow-1"
        inherit={false}
        alignContent="center"
        notAutoAllocateHeight
      >
        <Container>
          <RowFrame animate={{ x: x }} transition={spring}>
            <LandingpageText variant="h1" className="no-drag">
              {PRODUCT_LIST.map((item, i) => {
                return (
                  <List
                    key={i}
                    gradient={beforeClick === i ? item.gradient : "#F1F1F1"}
                    onClick={e => {
                      handleTabSelectionChange(i);
                    }}
                    ref={elRefs.current[i]}
                  >
                    {item.title}
                  </List>
                );
              })}
            </LandingpageText>
          </RowFrame>
        </Container>
      </SectionLayout>
      <VideoWrapper
        width={["95%", "95%", "100%", "100%"]}
        mt="50px"
        mx={["20px", "20px", 0, 0]}
      >
        <motion.div
          variants={videoPlayerMotionAnimationVariants}
          animate={isVideoPlayerReady ? "loaded" : "loading"}
        >
          <ReactPlayer
            onReady={() => setIsVideoPlayerReady(true)}
            onEnded={() => setIsVideoPlayerReady(true)}
            url={PRODUCT_LIST[beforeClick].path}
            loop
            playing
            muted
            config={{
              file: {
                attributes: {
                  preload: "auto",
                },
              },
            }}
          />
        </motion.div>
      </VideoWrapper>
      <SubTitle
        fontSize={["18px", "32px", "32px", "32px"]}
        mt="40px"
        fontWeight="600"
        letterSpacing="0em"
        style={{ maxWidth: "60%" }}
      >
        {PRODUCT_LIST[beforeClick].subTitle}
      </SubTitle>
      <Description variant="body1">
        {PRODUCT_LIST[beforeClick].desc}
      </Description>
      {/* todo: temprarily disabled */}
      {/* <BlankArea height={30} />
      <More>See also</More>
      <MoreLists>
        <Link href="/">
          <span>idea</span>
        </Link>
        <Link href="/">
          <span>server</span>
        </Link>
        <Link href="/">
          <span>translations</span>
        </Link>
        <Link href="/">
          <span>insight</span>
        </Link>
        <Link href="/">
          <span>everything</span>
        </Link>
      </MoreLists> */}
      <BlankArea height={[158, 315]} />
    </SectionLayout>
  );
};

export default Products;

const SubTitle = styled(Heading)`
  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[0])} {
    max-width: calc(100vw - 40px) !important;
  }
`;

const VideoWrapper = styled(Flex)`
  height: 700px;

  div {
    width: 100% !important;
    height: 100% !important;
  }

  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[0])} {
    height: 100%;
    margin-left: 0px !important;
  }

  ${props =>
    media(
      (props.theme as ThemeInterface).breakpoints[0],
      (props.theme as ThemeInterface).breakpoints[1],
    )} {
    height: 500px;
  }

  ${props =>
    media(
      (props.theme as ThemeInterface).breakpoints[1],
      (props.theme as ThemeInterface).breakpoints[2],
    )} {
    height: 700px;
  }
`;

const Description = styled(LandingpageText)`
  max-width: 760px;
  margin-top: 32px;

  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[0])} {
    max-width: 100%;
  }
`;

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: auto;

  &:before {
    left: 0;
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
    content: "";
    top: 0;
    width: 8%;
    height: 100%;
    position: absolute;
    z-index: 100;
    pointer-events: none;
  }

  &:after {
    right: 0;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
    content: "";
    top: 0;
    width: 8%;
    height: 100%;
    position: absolute;
    z-index: 100;
    pointer-events: none;
  }
`;

const RowFrame = styled(motion.div)`
  display: flex;
  width: 80.5%;
  padding-bottom: 10px;

  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[2])} {
    width: 95%;
  }

  cursor: pointer;

  &[data-isOn="true"] {
    color: "red";
    background-color: "red";
    justify-content: flex-start;
  }
`;

const List = styled.span<{ gradient: string }>`
  padding-left: 10px;
  margin-left: 26px;
  background: ${p => p.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0em;

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  ${props => media("0px", (props.theme as ThemeInterface).breakpoints[0])} {
    margin-left: 35px;
    &:first-of-type {
      padding-left: 10px;
    }

    &:last-of-type {
      margin-left: 27px;
    }
  }

  ${props =>
    media(
      (props.theme as ThemeInterface).breakpoints[0],
      (props.theme as ThemeInterface).breakpoints[1],
    )} {
    &:first-of-type {
      padding-left: 1%;
    }
  }
`;

const More = styled(Text)`
  padding-bottom: 8px;
  border-bottom: 2px solid black;
`;

const MoreLists = styled(Flex)`
  margin-top: 10px;

  span {
    margin-right: 24px;
    font-size: 18px;
    color: #aeaeae;
  }

  @media (max-width: 767px) {
    overflow-x: auto;
    width: 100%;
  }
`;
