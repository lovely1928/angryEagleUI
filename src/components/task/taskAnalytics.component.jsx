import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryPie,
  VictoryLegend,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryTheme,
} from "victory";
import { UseCallApi } from "../../hooks/useApiCall";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";

const TaskAnalytics = () => {
  const params = useParams(); 
  const { loading: lineChartLoading, data: lineChart } = UseCallApi({
    url: "http://localhost:4000/api/task/analytics/" + params.id,
    method: "get",
  });

  const formatData = (data) =>
    data.map((entry) => ({
      x: entry.date, // Convert date to a JavaScript Date object
      y: entry.count,
    }));

  const formatBarData = (data) => {
    return data.map((x) => ({ x: x.firstName, y: x.count }));
  };

  return (
    <div className="flex w-[100%] flex-wrap gap-4 ">
      {/* Task analytics based on their status with time created */}
      {lineChartLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div className="h-[300px] w-[70%] bg-white rounded-lg shadow-md">
          <VictoryChart
            width={1000}
            domainPadding={30}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x" // Allow zooming only along the x-axis
                allowZoom={true} // Enables zoom
                allowPan={true} // Enables panning
              />
            }
          >
            {/* X-axis */}
            <VictoryAxis
              style={{ width: 500 }}
              tickFormat={(t) => moment(t * 1000).format("MMM DD")} // Format date using moment
            />
            {/* Y-axis */}
            <VictoryAxis dependentAxis />

            {/* Active Line Chart */}
            <VictoryLine
              data={formatData(lineChart.data.chart.active)}
              style={{
                data: { stroke: "blue" },
              }}
            />

            {/* In-Progress Line Chart */}
            <VictoryLine
              data={formatData(lineChart.data.chart.inProgress)}
              style={{
                data: { stroke: "orange" },
              }}
            />

            {/* Completed Line Chart */}
            <VictoryLine
              data={formatData(lineChart.data.chart.completed)}
              style={{
                data: { stroke: "green" },
              }}
            />

            {/* Legend */}
            <VictoryLegend
              x={125}
              y={50}
              orientation="horizontal"
              gutter={20}
              data={[
                { name: "Active", symbol: { fill: "blue" } },
                { name: "In Progress", symbol: { fill: "orange" } },
                { name: "Completed", symbol: { fill: "green" } },
              ]}
            />
          </VictoryChart>
        </div>
      )}

      {/* Total Tasks overall */}
      {lineChartLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div className="chart-container w-[27%] h-[300px] bg-white rounded-lg shadow-md">
          <VictoryPie
            innerRadius={50}
            width={300}
            data={[
              { x: "Cats", y: 30 },
              { x: "Dogs", y: 35 },
              { x: "Birds", y: 25 },
              { x: "Rabbits", y: 10 },
            ]}
            theme={VictoryTheme.clean}
          />
        </div>
      )}

      {/* Member-wise task analytics */}
      {lineChartLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div className="chart-container w-[40%] h-[40vh] bg-white p-4 rounded-lg shadow-md">
          <VictoryChart
            theme={VictoryTheme.clean}
            domain={{ y: [0.5, 5.5] }}
            domainPadding={{ x: 40 }}
          >
            <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
              <VictoryBar
                data={formatBarData(lineChart.data.bar.active)}
                labels={({ datum }) => datum.y}
              />
              <VictoryBar
                data={formatBarData(lineChart.data.bar.inProgress)}
                labels={({ datum }) => datum.y}
              />
              <VictoryBar
                data={formatBarData(lineChart.data.bar.completed)}
                labels={({ datum }) => datum.y}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default TaskAnalytics;
