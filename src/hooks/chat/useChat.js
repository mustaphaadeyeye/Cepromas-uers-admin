import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useChat = (agentId) => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["chat", agentId],
    queryFn: async () => (await api.get(`/chat/${agentId}`)).data,
    enabled: !!agentId,
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: (text) => api.post(`/chat/${agentId}`, { text }),
    onSuccess: () => queryClient.invalidateQueries(["chat", agentId]),
  });

  return { messages, isLoading, sendMessage };
};
