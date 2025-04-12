import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const DASHBOARD_ANALYTICS_KEY = "dashboardAnalytics" as const;

const fetchDashboardAnalytics = async () => {
  const response = await axiosInstance.get('/task/analytics');
  return response.data;
};

export function useDashboardAnalyticsQuery() {
  return useQuery({
    queryKey: [DASHBOARD_ANALYTICS_KEY],
    queryFn: fetchDashboardAnalytics,
  });
}