import React, { useState, useRef, useEffect } from "react";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import SendIcon from "../../assets/icons/send.png";
import ChatPro from "../../assets/icons/chathead.png";
import Wrapper from "../../components/wrapper/Wrapper";
import api from "../../api/axios.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

const ChatLayout = ({ variant = "default", agentId: propAgentId }) => {
  const { agentId: paramAgentId } = useParams();
  const agentId = paramAgentId || propAgentId;
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // 1. Fetch conversations list for sidebar
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await api.get("/chat/conversations/list");
      return res?.data ?? res;
    },
    refetchInterval: 4000,
  });

  // 2. Fetch direct partner profile immediately when agentId is present
  const { data: partnerProfile } = useQuery({
    queryKey: ["partner-profile", agentId],
    queryFn: async () => {
      if (!agentId) return null;
      const res = await api.get(`/chat/user/${agentId}`);
      return res?.data ?? res;
    },
    enabled: !!agentId,
  });

  // 3. Fetch chat messages
  const { data: chatData } = useQuery({
    queryKey: ["chat", agentId],
    queryFn: async () => {
      if (!agentId) return { messages: [] };
      const res = await api.get(`/chat/${agentId}`);
      return res?.data ?? res;
    },
    enabled: !!agentId,
    refetchInterval: 2500,
  });

  const apiMessages =
    chatData?.messages || (Array.isArray(chatData) ? chatData : []);
  const [optimisticMessages, setOptimisticMessages] = useState([]);

  useEffect(() => {
    setOptimisticMessages([]);
  }, [apiMessages]);

  const { mutate: postMessage, isPending } = useMutation({
    mutationFn: async (msgText) => {
      if (!agentId) return null;
      const res = await api.post(`/chat/${agentId}`, { text: msgText });
      return res?.data ?? res;
    },
    onSuccess: () => {
      if (agentId) {
        queryClient.invalidateQueries(["chat", agentId]);
        queryClient.invalidateQueries(["conversations"]);
      }
    },
  });

  const activeChatMessages = [
    ...apiMessages.map((msg) => ({
      id: msg.id,
      senderId: msg.senderId,
      text: msg.text,
      createdAt: msg.createdAt,
    })),
    ...optimisticMessages,
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatMessages]);

  const send = () => {
    if (!text.trim() || isPending || !agentId) return;

    const trimmedText = text.trim();
    setText("");

    const tempMsg = {
      id: `temp-${Date.now()}`,
      senderId: "currentUser",
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };
    setOptimisticMessages((prev) => [...prev, tempMsg]);

    postMessage(trimmedText);
  };

  const sidebarPartner = conversations.find((c) => c.partnerId === agentId);
  const activePartner = partnerProfile || chatData?.partner || sidebarPartner;

  const isOnline = activePartner?.isOnline ?? false;
  const getLastActiveText = (dateString) => {
    if (!dateString) return "Offline";
    const date = new Date(dateString);
    return `Last active at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (${date.toLocaleDateString()})`;
  };

  const content = (
    <div
      className={`flex h-[78vh] ${fontFamily.main} bg-white rounded-[20px] shadow-lg overflow-hidden border border-gray-100 ${
        variant === "settings" ? "p-0" : "my-4 mx-auto max-w-6xl"
      }`}
    >
      {/* Sidebar - Conversation List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-[#F8FAFD]">
        <div className="p-5 border-b border-gray-100">
          <h2
            className={`${fontSize.lg} ${fontWeight.semibold} ${textColor.primary}`}
          >
            Messages
          </h2>
          <p className={`${fontSize.xs} ${textColor.secondary} mt-0.5`}>
            Recent property and investment chats
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400">
              No active conversations yet. Click "Message Owner" on any property
              or investment listing!
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.chatId}
                onClick={() => navigate(`/app/chat/${conv.partnerId}`)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition relative ${
                  agentId === conv.partnerId
                    ? "bg-[#DBE8FD]/60 border-l-4 border-[#2540A8]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[#05062F]">
                  {conv.avatar ? (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    conv.name.charAt(0)
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-[#05062F] truncate">
                      {conv.name}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {new Date(conv.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-[11px] text-gray-500 truncate">
                      {conv.lastMessage}
                    </p>
                    {conv.hasUnread && (
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 ml-1"
                        title="Unread message"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Active Chat Box */}
      <div className="flex-1 flex flex-col bg-white">
        {agentId ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-white">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center font-bold text-[#05062F] shrink-0">
                {activePartner?.avatar ? (
                  <img
                    src={activePartner.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  activePartner?.name?.charAt(0) || "A"
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-[#05062F]">
                  {activePartner?.name || "Loading..."}
                </h3>
                <span
                  className={`text-[11px] font-medium ${isOnline ? "text-emerald-600" : "text-gray-400"}`}
                >
                  {isOnline
                    ? "● Online"
                    : `○ ${getLastActiveText(activePartner?.lastActive)}`}
                </span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#F9FBFC]">
              {activeChatMessages.map((msg, i) => {
                const isUser = msg.senderId !== agentId;
                return (
                  <div
                    key={msg.id || i}
                    className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold">
                        {activePartner?.avatar ? (
                          <img
                            src={activePartner.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          activePartner?.name?.charAt(0) || "A"
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-3 text-xs leading-relaxed rounded-2xl shadow-xs ${
                        isUser
                          ? "bg-[#2540A8] text-white rounded-br-sm"
                          : "bg-white text-[#05062F] border border-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      <span
                        className={`block text-[9px] mt-1 text-right ${isUser ? "text-blue-100" : "text-gray-400"}`}
                      >
                        {new Date(
                          msg.createdAt || Date.now(),
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#2540A8] transition"
              />
              <button
                onClick={send}
                disabled={isPending}
                className="w-11 h-11 rounded-xl bg-[#05062F] hover:bg-[#1a2352] text-white flex items-center justify-center cursor-pointer transition shrink-0 shadow-sm"
              >
                <img
                  src={SendIcon}
                  alt="Send"
                  className="w-4 h-4 brightness-0 invert"
                />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
            <div className="w-16 h-16 rounded-full bg-[#DBE8FD] flex items-center justify-center mb-3">
              <img src={ChatPro} alt="" className="w-8 h-8 opacity-75" />
            </div>
            <h3 className="text-base font-bold text-[#05062F]">
              Select a conversation
            </h3>
            <p className="text-xs text-gray-400 max-w-xs mt-1">
              Choose an agent from your sidebar or click "Message Owner" on any
              property or investment listing to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (variant === "settings") return content;
  return <Wrapper>{content}</Wrapper>;
};

export default ChatLayout;
