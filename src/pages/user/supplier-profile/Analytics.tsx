import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Import the PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsAndReporting = () => {
  const analyticsData = {
    productViews: {
      total: 3400,
      byCountry: {
        USA: 1200,
        UK: 800,
        Germany: 500,
        Uganda: 300,
        India: 600,
      },
    },
    buyerInterest: {
      inquiries: 180,
      trends: {
        increasingInquiries: ["USA", "Germany"],
        decreasingInquiries: ["UK", "Uganda"],
      },
    },
    topPerformingShowrooms: ["USA", "Germany"],
    showroomsNeedingImprovement: ["UK", "Uganda"],
  };

  const [viewType, setViewType] = useState("overview");

  const productViewsData = {
    labels: Object.keys(analyticsData.productViews.byCountry),
    datasets: [
      {
        label: "Product Views",
        data: Object.values(analyticsData.productViews.byCountry),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const buyerInterestData = {
    labels: ["USA", "Germany", "UK", "Uganda"],
    datasets: [
      {
        label: "Inquiries Trends",
        data: [50, 40, 30, 60],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const showroomPerformanceData = {
    labels: ["USA", "Germany", "UK", "Uganda"],
    datasets: [
      {
        label: "Showroom Performance",
        data: [30, 25, 20, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="analytics-reporting container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Analytics and Reporting</h2>

      <section className="analytics bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Product Performance</h3>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setViewType(viewType === "overview" ? "detailed" : "overview")
            }
          >
            {viewType === "overview"
              ? "View Detailed Reports"
              : "View Overview"}
          </button>
        </div>

        {viewType === "overview" && (
          <div className="overview">
            <div className="mb-4">
              <h4 className="font-medium">Product Views</h4>
              <Bar
                data={productViewsData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>

            <div className="mb-4">
              <h4 className="font-medium">Buyer Interest Trends</h4>
              <Line
                data={buyerInterestData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>

            <div className="mb-4">
              <h4 className="font-medium">Showroom Performance</h4>
              <Pie
                data={showroomPerformanceData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </div>
        )}

        {viewType === "detailed" && (
          <div className="detailed-reports">
            {/* Detailed report content */}
          </div>
        )}
      </section>
    </div>
  );
};

export default AnalyticsAndReporting;
