import React from "react";
import Dream11Team from "./Team";
import MenuTabs from "../Layout/MenuTabs";

function Dream11() {
  return (
    <MenuTabs contentClassName="mx-auto mb-28 max-w-7xl px-0 pt-2 pb-[calc(6.75rem+env(safe-area-inset-bottom))] sm:mb-24 sm:px-4 sm:py-6">
      <section className="h-[calc(100dvh-7.75rem)] min-h-[520px] sm:h-[calc(100dvh-10rem)] sm:min-h-[720px]">
        <Dream11Team />
      </section>
    </MenuTabs>
  );
}

export default Dream11;
