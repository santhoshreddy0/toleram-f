import React from "react";
import { AreaChart, BarChart } from "@tremor/react";
import { useState } from "react";

export default function CustomAreaChart({
  title,
  chartdata,
  categories,
  colors,
}) {
  const [value, setValue] = useState();
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
      </h3>
      <AreaChart
        className="mx-5"
        data={chartdata}
        index="name"
        categories={categories}
        colors={colors}
        yAxisWidth={20}
        onValueChange={(v) => setValue(v)}
        showAnimation={true}
      />
    </>
  );
}
