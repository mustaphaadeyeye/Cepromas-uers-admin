import React from "react";
import Wrapper from "../wrapper/Wrapper";
import { fontSize, fontWeight, fontFamily, textColor } from "../styles/theme";
import BellImg from "../../assets/image/bellpng.png";
import { useNotifications } from "../../hooks/notification/useNotification";

const WithdrawIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 17L17 7M17 7H9M17 7V15"
      stroke="#16A34A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="rotate(90 12 12)"
    />
  </svg>
);

const NotificationCard = ({ item, onMarkAsRead }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString();
  const formattedTime = new Date(item.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => !item.isRead && onMarkAsRead(item.id)}
      className={`relative bg-white border border-gray-100 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] cursor-pointer transition hover:border-gray-200 ${
        !item.isRead ? "bg-blue-50/20" : ""
      }`}
    >
      <span
        className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
          !item.isRead ? "bg-red-600" : "bg-gray-200"
        }`}
      />
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
          <WithdrawIcon />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {item.title}
          </p>
          <p className="text-[12.5px] text-gray-500 leading-relaxed">
            {item.message}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[11px] text-gray-400">{formattedTime}</span>
            <span className="text-[11px] text-gray-400">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const { notifications, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  // Helper to group notifications into Today, Yesterday, and Older
  const groupNotifications = (items) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const groups = { Today: [], Yesterday: [], Earlier: [] };

    items.forEach((item) => {
      const itemDate = new Date(item.createdAt).toDateString();
      if (itemDate === today) {
        groups.Today.push(item);
      } else if (itemDate === yesterday) {
        groups.Yesterday.push(item);
      } else {
        groups.Earlier.push(item);
      }
    });

    return Object.entries(groups)
      .filter(([_, items]) => items.length > 0)
      .map(([label, items]) => ({ label, items }));
  };

  const notificationGroups = groupNotifications(notifications);

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className="flex bg-white px-5 sm:px-7 pt-6 pb-10">
          {/* Notifications column */}
          <div className="w-full lg:max-w-[520px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
              {notifications.some((n) => !n.isRead) && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-xs font-semibold text-[#2540A8] hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-sm text-gray-400">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-16 text-center text-sm text-gray-400">
                You have no notifications yet.
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {notificationGroups.map((group) => (
                  <div key={group.label} className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-4">
                      {group.items.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          onMarkAsRead={markAsRead}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Decorative illustration, desktop only */}
          <div className="hidden lg:flex flex-1 items-start justify-center pt-16">
            <img src={BellImg} alt="Notifications" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Notification;
