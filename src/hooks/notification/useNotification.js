import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      return res?.data ?? res;
    },
    refetchInterval: 5000,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { mutate: markAllAsRead } = useMutation({
    mutationFn: async () => {
      await api.patch(`/notifications/read-all`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return { notifications, isLoading, markAsRead, markAllAsRead };
};
