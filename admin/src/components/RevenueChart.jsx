import React from "react";
import Chart from "react-apexcharts";

const RevenueChart = () => {
  const chartOptions = {
    chart: {
      height: 300,
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: "2023",
        data: [
          18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000,
          60000, 70000,
        ],
      },
      {
        name: "2022",
        data: [
          27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000,
          42000, 50000,
        ],
      },
    ],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    grid: {
      strokeDashArray: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: "category",
      tickPlacement: "on",
      categories: [
        "15 January",
        "15 February",
        "15 March",
        "15 April",
        "15 May",
        "15 June",
        "15 July",
        "15 August",
        "15 September",
        "15 October",
        "15 November",
        "15 December",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
        formatter: (title) => {
          let t = title;
          if (t) {
            const newT = t.split(" ");
            t = `${newT[1].slice(0, 3)}`;
          }
          return t;
        },
      },
    },
    yaxis: {
      labels: {
        align: "left",
        style: {
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
        formatter: (value) =>
          value >= 1000 ? `${value / 1000}k` : value.toString(),
      },
    },
    tooltip: {
      x: {
        format: "MMMM yyyy",
      },
      y: {
        formatter: (value) =>
          `$${value >= 1000 ? `${value / 1000}k` : value.toString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 568,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              style: {
                colors: "#9ca3af",
                fontSize: "11px",
                fontFamily: "Inter, ui-sans-serif",
                fontWeight: 400,
              },
              formatter: (title) => title.slice(0, 3),
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#9ca3af",
                fontSize: "11px",
                fontFamily: "Inter, ui-sans-serif",
                fontWeight: 400,
              },
              formatter: (value) =>
                value >= 1000 ? `${value / 1000}k` : value.toString(),
            },
          },
        },
      },
    ],
  };

  return (
    <>
      {/* Legend */}
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Income
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-purple-600 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Outcome
          </span>
        </div>
      </div>

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="area"
        height={300}
      />
    </>
  );
};

export default RevenueChart;
