import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Input from "../../../../components/common/Input/Input";
import { CreateDestinationData } from "../../../../services/types/destination.types";
import { useToast } from "../../../../components/common/Toast/Toast";

interface ReviewsFormProps {
  formData: CreateDestinationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateDestinationData>>;
}

export const ReviewsForm: React.FC<ReviewsFormProps> = ({ formData, setFormData }) => {
  const { showToast } = useToast();

  const [currentReview, setCurrentReview] = useState({
    name: "",
    rating: "",
    date: "",
    comment: "",
    avatar: "",
    tripType: "",
  });

  const addReview = () => {
    if (
      !currentReview.name ||
      !currentReview.rating ||
      !currentReview.date ||
      !currentReview.comment
    ) {
      showToast("Please fill in review name, rating, date, and comment", "error");
      return;
    }

    const newReview = {
      id: `review-${Date.now()}`,
      name: currentReview.name,
      rating: parseInt(currentReview.rating),
      date: currentReview.date,
      comment: currentReview.comment,
      avatar: currentReview.avatar || "",
      tripType: currentReview.tripType || "",
    };

    setFormData((prev) => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));

    setCurrentReview({
      name: "",
      rating: "",
      date: "",
      comment: "",
      avatar: "",
      tripType: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
      <div className="border-b pb-4 mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Reviewer Name"
            value={currentReview.name}
            onChange={(e) =>
              setCurrentReview({ ...currentReview, name: e.target.value })
            }
          />
          <Input
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            value={currentReview.rating}
            onChange={(e) =>
              setCurrentReview({ ...currentReview, rating: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={currentReview.date}
            onChange={(e) =>
              setCurrentReview({ ...currentReview, date: e.target.value })
            }
          />
          <Input
            label="Trip Type"
            value={currentReview.tripType}
            onChange={(e) =>
              setCurrentReview({
                ...currentReview,
                tripType: e.target.value,
              })
            }
          />
        </div>
        <Input
          label="Avatar URL"
          value={currentReview.avatar}
          onChange={(e) =>
            setCurrentReview({ ...currentReview, avatar: e.target.value })
          }
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment *
          </label>
          <textarea
            value={currentReview.comment}
            onChange={(e) =>
              setCurrentReview({ ...currentReview, comment: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={addReview}
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          Add Review
        </button>
      </div>
      {formData.reviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Added Reviews:</h3>
          <div className="space-y-2">
            {formData.reviews.map((review, idx) => (
              <div key={idx} className="flex justify-between items-start border p-3 rounded">
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-sm text-gray-600">
                    Rating: {review.rating}/5 - {review.date}
                  </p>
                  <p className="text-sm mt-1">{review.comment}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      reviews: prev.reviews.filter((_, i) => i !== idx),
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
