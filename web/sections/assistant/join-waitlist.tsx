import styled from "@emotion/styled";
import React from "react";
import { FeaturedCard } from "./featured-card";

export function JoinWaitlistSection() {
  return (
    <div
      style={{
        display: "flex",
        padding: "40px",
        justifyContent: "center",
      }}
    >
      <FeaturedCard>
        <h1>Join the waitlist</h1>
        <button>Register</button>
      </FeaturedCard>
    </div>
  );
}
