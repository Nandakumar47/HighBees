import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Input from "../../../../components/common/Input/Input";
import { CreateDestinationData } from "../../../../services/types/destination.types";
import { useToast } from "../../../../components/common/Toast/Toast";

interface AttractionsFormProps {
  formData: CreateDestinationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateDestinationData>>;
}

export const AttractionsForm: React.FC<AttractionsFormProps> = ({ formData, setFormData }) => {
  const { showToast } = useToast();

  const [currentAttraction, setCurrentAttraction] = useState({
    name: "",
    type: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const addAttraction = () => {
    if (
      !currentAttraction.name ||
      !currentAttraction.type ||
      !currentAttraction.latitude ||
      !currentAttraction.longitude ||
      !currentAttraction.description
    ) {
      showToast("Please fill in all attraction fields", "error");
      return;
    }

    const coordinates: [number, number] = [
      parseFloat(currentAttraction.latitude),
      parseFloat(currentAttraction.longitude),
    ];

    const newAttraction = {
      name: currentAttraction.name,
      type: currentAttraction.type,
      coordinates,
      description: currentAttraction.description,
    };

    setFormData((prev) => ({
      ...prev,
      attractions: [...prev.attractions, newAttraction],
    }));

    setCurrentAttraction({
      name: "",
      type: "",
      latitude: "",
      longitude: "",
      description: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Attractions</h2>
      <div className="border-b pb-4 mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Attraction Name"
            value={currentAttraction.name}
            onChange={(e) =>
              setCurrentAttraction({
                ...currentAttraction,
                name: e.target.value,
              })
            }
          />
          <Input
            label="Type"
            value={currentAttraction.type}
            onChange={(e) =>
              setCurrentAttraction({
                ...currentAttraction,
                type: e.target.value,
              })
            }
            placeholder="e.g., Historical Site"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Latitude"
            type="number"
            step="any"
            value={currentAttraction.latitude}
            onChange={(e) =>
              setCurrentAttraction({
                ...currentAttraction,
                latitude: e.target.value,
              })
            }
          />
          <Input
            label="Longitude"
            type="number"
            step="any"
            value={currentAttraction.longitude}
            onChange={(e) =>
              setCurrentAttraction({
                ...currentAttraction,
                longitude: e.target.value,
              })
            }
          />
        </div>
        <Input
          label="Description"
          value={currentAttraction.description}
          onChange={(e) =>
            setCurrentAttraction({
              ...currentAttraction,
              description: e.target.value,
            })
          }
        />
        <button
          type="button"
          onClick={addAttraction}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          Add Attraction
        </button>
      </div>
      {formData.attractions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Added Attractions:</h3>
          <div className="space-y-2">
            {formData.attractions.map((attraction, idx) => (
              <div key={idx} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <p className="font-medium">{attraction.name}</p>
                  <p className="text-sm text-gray-600">{attraction.type}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      attractions: prev.attractions.filter(
                        (_, i) => i !== idx
                      ),
                    }));
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
