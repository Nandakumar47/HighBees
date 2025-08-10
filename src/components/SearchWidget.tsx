import React, { useState } from "react";
import {
  Plane,
  Hotel,
  Package,
  Calendar,
  MapPin,
  Users,
  Search,
} from "lucide-react";
import Select from "./common/Input/Select";
import Input from "./common/Input/Input";

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [travelers, setTravelers] = useState("1 Adult");

  const tabs = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "packages", label: "Packages", icon: Package },
  ];

  return (
    <section className="relative -mt-32 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From/To */}
            <div className="space-y-4 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <Input
                    type="text"
                    placeholder="Departure city"
                    icon={MapPin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <Input type="text" placeholder="Destination" icon={MapPin} />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure
              </label>
              <Input type="date" icon={Calendar} />
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="pl-10 pr-8"
                  placeholder="Select travelers"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="2 Adults, 2 Children">
                    2 Adults, 2 Children
                  </option>
                </Select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <button className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Search className="w-5 h-5" />
              <span>
                Search {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchWidget;
