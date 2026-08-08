import React from "react";
import Wrapper from "../components/wrapper/Wrapper";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../components/styles/theme";
import BellImg from "../assets/image/bellpng.png"

const notificationGroups = [
  {
    label: "Today",
    items: [
      {
        id: 1,
        title: "Withdraw",
        description:
          "Lorem ipsum dolor sit amet consectetur. Eu semper enim aliquam consequat ac consectetur aliquet et pellentesque. Pulvinar mollis aliquam non lectus molestie et. Velit accumsan nullam luctus et massa rhoncus eget malesuada. Sit urna viverra pretium foucibus id pulvinar. Nibh bla",
        time: "11:30am",
        date: "10/09/2025",
        unread: true,
      },
      {
        id: 2,
        title: "Withdraw",
        description:
          "Lorem ipsum dolor sit amet consectetur. Eu semper enim aliquam consequat ac consectetur aliquet et pellentesque. Pulvinar mollis aliquam non lectus molestie et. Velit accumsan nullam luctus et massa rhoncus eget malesuada. Sit urna viverra pretium foucibus id pulvinar. Nibh bla",
        time: "11:30am",
        date: "10/09/2025",
        unread: false,
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: 3,
        title: "Withdraw",
        description:
          "Lorem ipsum dolor sit amet consectetur. Eu semper enim aliquam consequat ac consectetur aliquet et pellentesque. Pulvinar mollis aliquam non lectus molestie et. Velit accumsan nullam luctus et massa rhoncus eget malesuada. Sit urna viverra pretium foucibus id pulvinar. Nibh bla",
        time: "11:11am",
        date: "10/09/2025",
        unread: true,
      },
      {
        id: 4,
        title: "Withdraw",
        description:
          "Lorem ipsum dolor sit amet consectetur. Eu semper enim aliquam consequat ac consectetur aliquet et pellentesque. Pulvinar mollis aliquam non lectus molestie et. Velit accumsan nullam luctus et massa rhoncus eget malesuada. Sit urna viverra pretium foucibus id pulvinar. Nibh",
        time: "11:11am",
        date: "10/09/2025",
        unread: false,
      },
    ],
  },
];

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

const BellIllustration = () => (
  <svg viewBox="0 0 220 260" className="w-full max-w-[260px] h-auto" fill="none">
    <path
      d="M110 20c-8 0-14 6-14 14v6c-30 6-52 32-52 63v46l-16 24h164l-16-24V103c0-31-22-57-52-63v-6c0-8-6-14-14-14z"
      fill="#E7E9F3"
    />
    <path
      d="M84 173c0 14 12 26 26 26s26-12 26-26"
      stroke="#E7E9F3"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

const NotificationCard = ({ item }) => (
  <div className="relative bg-white border border-gray-100 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
    <span
      className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
        item.unread ? "bg-red-600" : "bg-red-200"
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
        <p className="text-[12.5px] text-gray-400 leading-relaxed line-clamp-3 sm:line-clamp-none">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-gray-400">{item.time}</span>
          <span className="text-[11px] text-gray-400">{item.date}</span>
        </div>
      </div>
    </div>
  </div>
);

const Notification = () => {
  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className="flex bg-white px-5 sm:px-7 pt-6 pb-10">
          {/* Notifications column */}
          <div className="w-full lg:max-w-[520px] flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 mb-6">
              Notifications
            </h1>

            <div className="flex flex-col gap-8">
              {notificationGroups.map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {group.label}
                  </p>
                  <div className="flex flex-col gap-4">
                    {group.items.map((item) => (
                      <NotificationCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
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