import { FiChevronDown, FiMapPin } from "react-icons/fi";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const LocationSelect = () => {
  return (
    <div className="relative w-full lg:w-72">
      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <select className="appearance-none w-full h-12 border border-gray-200 rounded-lg bg-white pl-10 pr-10 text-sm text-gray-500 outline-none">
        <option>Location</option>

        {states.map((state) => (
          <option key={state}>{state}</option>
        ))}
      </select>

      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default LocationSelect;