import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Info } from "lucide-react";
import ConfirmationDialogue from "../components/confirmationDialogue";

const NotificationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, deeplink, platforms, image } = location.state || {};

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Notification details
        </h2>
        <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center">
          <Info size={14} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form */}
        <div className="flex-1 space-y-6">
          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Message
            </label>
            <textarea
              value={message || ""}
              readOnly
              className="w-full h-24 border border-gray-300 rounded-lg p-3 text-sm resize-none bg-gray-50"
            />
          </div>

          {/* Deeplink */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Deeplink
            </label>
            <input
              type="text"
              value={deeplink || ""}
              readOnly
              placeholder="enter Deeplink eg yoraa/product/123"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
            />
          </div>

          {/* Targeted platform */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Targeted platform
            </label>
            <input
              type="text"
              value={
                platforms?.length === 2 ? "android/ios" : platforms?.[0] || ""
              }
              readOnly
              className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              className="bg-black text-white px-8 py-2 rounded-full text-sm hover:bg-gray-800 cursor-pointer"
              onClick={() => setConfirmDialogOpen(true)}
            >
              send Now
            </button>
            <button
              className="text-sm text-gray-600 px-8 py-2 rounded-full border hover:text-gray-900 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              go back
            </button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:w-80">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Image Preview
          </h3>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-64">
            {image ? (
              <img
                src={image}
                alt="Notification Preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                  <Mail size={32} className="text-blue-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "0 0 0 100vmax rgba(0,0,0,0.12)" }}
          />
          <ConfirmationDialogue
            open={confirmDialogOpen}
            message="Are you sure you want to send this notification"
            confirmText="Yes"
            cancelText="Cancel"
            onConfirm={() => {
              setConfirmDialogOpen(false);
              // Add your send notification logic here
              console.log("Notification sent!");
              // Show success dialog
              setSuccessDialogOpen(true);
            }}
            onCancel={() => setConfirmDialogOpen(false)}
          />
        </div>
      )}

      {/* Success Dialog */}
      {successDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "0 0 0 100vmax rgba(0,0,0,0.12)" }}
          />
          <ConfirmationDialogue
            type="success"
            message="Notification sent"
            onDone={() => {
              setSuccessDialogOpen(false);
              navigate(-1); // Go back to previous page
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationDetails;
