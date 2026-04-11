import React from "react";
import RoundQuestions from "../Questions";
import CommentsSection from "../../../../Components/comments/CommentsSection";
import BackButtonWithRules from "../../../../Components/BackButtonWithRules";
import TabSwitcher from "../../../../Components/Tabs/TabsSwitcher";
import { useParams } from "react-router-dom";

function Round() {
  const { roundId } = useParams();
  const tabs = [
    { label: "Questions", content: <RoundQuestions /> },
    {
      label: "Discussion",
      content: <CommentsSection title="RoundTalk: Dive Into the Discussion" roomName={`round-${roundId}`} />,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(160deg,#060f1a_0%,#0a1f33_55%,#071322_100%)] px-4 pb-24 text-base leading-7 shadow-[0_18px_36px_rgba(0,0,0,0.3)] sm:px-6">
      <BackButtonWithRules />
      <TabSwitcher tabs={tabs} />
    </div>
  );
}

export default Round;
