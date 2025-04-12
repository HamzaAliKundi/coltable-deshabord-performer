import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import queryClient from "../queryClient";

const TASKS_QUERY_KEY = "tasks" as const;
const CURRENT_USER_QUERY_KEY = "currentUser" as const;

const fetchTasks = async (params: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const { page, limit, search } = params;
  const response = await axiosInstance.get(`/task/`, {
    params: { 
      page, 
      limit,
      search: search || undefined // Only include search if it has a value
    },
  });
  return response.data;
};

export function useTasksQuery(
  page: number,
  limit: number,
  search?: string
) {
  const params = { page, limit, search };
  return useQuery({
    queryKey: [TASKS_QUERY_KEY, params],
    queryFn: () => fetchTasks(params),
    enabled: !search || search.length > 0
  });
}

const addTask = async (data: {
  title: string;
  description: string;
}) => {
  const response = await axiosInstance.post('/task', data);
  return response.data;
};

export function useAddTaskMutation() {
  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
        exact: false,
        refetchType: "active",
      });
    },
  });
}

const deleteTask = async (id: string) => {
  await axiosInstance.delete(`/task/${id}`);
};
export function useDeleteTaskMutation() {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
        exact: false,
        refetchType: "active",
      });
    },
  });
}

const fetchTaskById = async (id: string) => {
  const response = await axiosInstance.get(`/task/${id}`);
  return response.data;
};

export function useGetTaskByIdQuery(id: string) {
  return useQuery({
    queryKey: [TASKS_QUERY_KEY, id],
    queryFn: () => fetchTaskById(id),
  });
}

const editTask = async ({ id, ...data }: { id: string; title: string; description: string }) => {
  const response = await axiosInstance.patch(`/task/${id}`, data);
  return response.data;
};

export function useEditTaskMutation() {
  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY],
        exact: false,
        refetchType: "active",
      });
    },
  });
}