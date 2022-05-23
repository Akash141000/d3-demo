import { useEffect, useRef, useState } from "react";
import styles from "./BarChart.module.scss";
import * as d3 from "d3";
import { Svg } from "./Svg";
import { render } from "@testing-library/react";

const BarChart = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef<SVGSVGElement>(null);
  const marginHorizontal = 20;
  const marginVertial = 30;
  const [mouseClick, setMouseClick] = useState(false);
  const [divWidth, setDivWidth] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);
  const [dummyData, setDummyData] = useState<{ id: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const random = parseInt((Math.random() * 10).toFixed(2));
    const dataSet = [];
    for (let i = 0; i < random; i++) {
      dataSet.push({
        id: Math.random().toFixed(3).toString().concat("id"),
        value: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      });
    }
    console.log("data", dataSet);
    setDummyData([...dataSet]);
    setMouseClick(false);
  }, [mouseClick]);

  useEffect(() => {
    const divElement = d3
      .select(divRef.current)
      .classed(styles.container, true);
    divElement.on("click", () => setMouseClick(true));
    const divWidth = divElement.node()?.getBoundingClientRect().width;
    const divHeight = divElement.node()?.getBoundingClientRect().height!;
    setDivHeight(divHeight!);
    setDivWidth(divWidth!);
  }, [divRef.current]);

  const renderGraph = () => {
    const svgElement = d3
      .select<SVGSVGElement, any>("svg")
      .attr("width", divWidth!)
      .attr("height", divHeight!)
      .classed(styles.chart_container, true);
    svgElement.selectAll("*").remove();
    const xScale = d3
      .scaleBand()
      .domain(dummyData.map((data) => data.id))
      .rangeRound([marginHorizontal, divWidth!])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, 15])
      .range([divHeight!, marginVertial]);

    svgElement
      .selectAll("rect")
      .data(dummyData)
      .enter()
      .append("rect")
      .classed(styles.bar_color, true)
      .attr("width", xScale.bandwidth())
      .attr("height", (data) => divHeight! - marginVertial - yScale(data.value))
      .attr("x", (data) => xScale(data.id)!)
      .attr("y", (data) => yScale(data.value)!);

    return svgElement;
  };

  const renderAxis = () => {
    console.log("renderAxis");
    const svgElement = d3.select<SVGSVGElement, any>("svg");
    const y = d3
      .scaleLinear()
      .domain([1, 15]) // This is what is written on the Axis: from 0 to 100
      .range([divHeight! - marginVertial, marginVertial]); // This is where the axis is placed: from 100 px to 800px
    console.log("axisDomain", dummyData.length);
    // Draw the axis
    const yAxis = svgElement
      .append("g")
      .attr("transform", `translate(${marginHorizontal},0)`) // This controls the vertical position of the Axis
      .call(d3.axisLeft(y).tickFormat(d3.format(".2")));

    const x = d3
      .scaleBand()
      .domain(dummyData.map((data) => data.value.toString()))
      .range([0, divWidth! - marginHorizontal]);

    const xAxis = svgElement
      .append("g")
      .attr(
        "transform",
        `translate(${marginHorizontal},${divHeight - marginVertial})`
      ) // This controls the vertical position of the Axis
      .call(d3.axisBottom(x));
  };

  useEffect(() => {
    if (divHeight && divWidth) {
      renderGraph();
      renderAxis();
    }
  }, [dummyData, divHeight, divWidth]);

  return (
    <>
      <p>Click on the chart to update</p>
      <div ref={divRef} className={styles.container}>
        <Svg ref={ref}></Svg>
      </div>
    </>
  );
};

export { BarChart };
