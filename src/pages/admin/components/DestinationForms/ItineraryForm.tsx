import React, { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import Input from "../../../../components/common/Input/Input";
import { CreateDestinationData } from "../../../../services/types/destination.types";
import { useToast } from "../../../../components/common/Toast/Toast";

interface ItineraryFormProps {
  formData: CreateDestinationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateDestinationData>>;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ formData, setFormData }) => {
  const { showToast } = useToast();
  
  const [currentItinerary, setCurrentItinerary] = useState<{
    id: string;
    title: string;
    duration: string;
    price: string;
    highlights: string[];
    dayByDay: Array<{
      id: number;
      day: number;
      title: string;
      activities: string[];
    }>;
  }>({
    id: "",
    title: "",
    duration: "",
    price: "",
    highlights: [],
    dayByDay: [],
  });

  const [itineraryHighlightInput, setItineraryHighlightInput] = useState("");
  
  const [currentDay, setCurrentDay] = useState<{
    day: string;
    title: string;
    activities: string[];
  }>({
    day: "",
    title: "",
    activities: [],
  });

  const [dayActivityInput, setDayActivityInput] = useState("");

  const addItinerary = () => {
    if (!currentItinerary.title || !currentItinerary.duration || !currentItinerary.price) {
      showToast("Please fill in itinerary title, duration, and price", "error");
      return;
    }

    const newItinerary = {
      id: currentItinerary.id || `itinerary-${Date.now()}`,
      title: currentItinerary.title,
      duration: currentItinerary.duration,
      price: parseFloat(currentItinerary.price),
      highlights: currentItinerary.highlights,
      dayByDay: currentItinerary.dayByDay,
    };

    setFormData((prev) => ({
      ...prev,
      itineraries: [...prev.itineraries, newItinerary],
    }));

    setCurrentItinerary({
      id: "",
      title: "",
      duration: "",
      price: "",
      highlights: [],
      dayByDay: [],
    });
    setCurrentDay({ day: "", title: "", activities: [] });
  };

  const addDayToItinerary = () => {
    if (!currentDay.day || !currentDay.title) {
      showToast("Please fill in day number and title", "error");
      return;
    }

    const newDay = {
      id: currentItinerary.dayByDay.length + 1,
      day: parseInt(currentDay.day),
      title: currentDay.title,
      activities: currentDay.activities,
    };

    setCurrentItinerary((prev) => ({
      ...prev,
      dayByDay: [...prev.dayByDay, newDay],
    }));

    setCurrentDay({ day: "", title: "", activities: [] });
    setDayActivityInput("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Itineraries</h2>
      
      {/* Current Itinerary Form */}
      <div className="border-b pb-4 mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Itinerary Title"
            value={currentItinerary.title}
            onChange={(e) =>
              setCurrentItinerary({ ...currentItinerary, title: e.target.value })
            }
          />
          <Input
            label="Duration"
            value={currentItinerary.duration}
            onChange={(e) =>
              setCurrentItinerary({ ...currentItinerary, duration: e.target.value })
            }
            placeholder="e.g., 10 days"
          />
          <Input
            label="Price"
            type="number"
            value={currentItinerary.price}
            onChange={(e) =>
              setCurrentItinerary({ ...currentItinerary, price: e.target.value })
            }
            placeholder="e.g., 899"
          />
        </div>

        {/* Itinerary Highlights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Itinerary Highlights
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={itineraryHighlightInput}
              onChange={(e) => setItineraryHighlightInput(e.target.value)}
              placeholder="Add highlight"
            />
            <button
              type="button"
              onClick={() => {
                if (itineraryHighlightInput.trim()) {
                  setCurrentItinerary({
                    ...currentItinerary,
                    highlights: [
                      ...currentItinerary.highlights,
                      itineraryHighlightInput.trim(),
                    ],
                  });
                  setItineraryHighlightInput("");
                }
              }}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {currentItinerary.highlights.map((h, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{h}</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentItinerary({
                      ...currentItinerary,
                      highlights: currentItinerary.highlights.filter(
                        (_, idx) => idx !== i
                      ),
                    });
                  }}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Day by Day */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Day by Day</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Day Number"
              type="number"
              value={currentDay.day}
              onChange={(e) =>
                setCurrentDay({ ...currentDay, day: e.target.value })
              }
            />
            <Input
              label="Day Title"
              value={currentDay.title}
              onChange={(e) =>
                setCurrentDay({ ...currentDay, title: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              label="Activity"
              value={dayActivityInput}
              onChange={(e) => setDayActivityInput(e.target.value)}
              placeholder="Add activity"
            />
            <button
              type="button"
              onClick={() => {
                if (dayActivityInput.trim()) {
                  setCurrentDay({
                    ...currentDay,
                    activities: [
                      ...currentDay.activities,
                      dayActivityInput.trim(),
                    ],
                  });
                  setDayActivityInput("");
                }
              }}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {currentDay.activities.map((a, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{a}</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentDay({
                      ...currentDay,
                      activities: currentDay.activities.filter(
                        (_, idx) => idx !== i
                      ),
                    });
                  }}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={addDayToItinerary}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Add Day
          </button>
        </div>

        {/* Current Itinerary Day by Day List */}
        {currentItinerary.dayByDay.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Added Days:</h4>
            {currentItinerary.dayByDay.map((day, idx) => (
              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded">
                <p className="font-medium">Day {day.day}: {day.title}</p>
                <ul className="list-disc list-inside ml-4">
                  {day.activities.map((act, actIdx) => (
                    <li key={actIdx} className="text-sm">{act}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addItinerary}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          Add Itinerary
        </button>
      </div>

      {/* Added Itineraries List */}
      {formData.itineraries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Added Itineraries:</h3>
          <div className="space-y-4">
            {formData.itineraries.map((itinerary, idx) => (
              <div key={idx} className="border p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{itinerary.title}</h4>
                    <p className="text-sm text-gray-600">
                      {itinerary.duration} - ${itinerary.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        itineraries: prev.itineraries.filter(
                          (_, i) => i !== idx
                        ),
                      }));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {itinerary.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <p className="text-sm font-medium">Days: {itinerary.dayByDay.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
