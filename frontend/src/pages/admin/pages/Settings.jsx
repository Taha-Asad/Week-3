import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // For notifications
import { Loader2 } from 'lucide-react'; // For loading spinner icon

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    contactEmail: '',
    currencySymbol: '',
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // --- Fetch Settings from Backend on Component Mount ---
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/settings'); // Connect to your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSettings(data);
        toast.success("Settings loaded successfully!");
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setError("Failed to load settings. Please try again.");
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount

  // --- Handle Form Field Changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  // --- Handle Form Submission (Save Settings) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSettings(data.settings); // Update with potentially new data from backend
      toast.success("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(`Failed to save settings: ${err.message}`);
      toast.error(`Failed to save settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <Loader2 className="animate-spin text-primary-accent mr-3" size={32} />
        <p className="text-lg text-text-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-text-dark mb-6">General Settings</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Name */}
        <div>
          <label htmlFor="siteName" className="block text-text-medium text-sm font-bold mb-2">
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm sm:text-base"
            placeholder="Your E-commerce Store"
            required
          />
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-text-medium text-sm font-bold mb-2">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm sm:text-base"
            placeholder="support@yourstore.com"
            required
          />
        </div>

        {/* Currency Symbol */}
        <div>
          <label htmlFor="currencySymbol" className="block text-text-medium text-sm font-bold mb-2">
            Currency Symbol
          </label>
          <input
            type="text"
            id="currencySymbol"
            name="currencySymbol"
            value={settings.currencySymbol}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm sm:text-base"
            placeholder="$"
            maxLength="5"
            required
          />
        </div>

        {/* Items Per Page */}
        <div>
          <label htmlFor="itemsPerPage" className="block text-text-medium text-sm font-bold mb-2">
            Items Per Page (Tables)
          </label>
          <input
            type="number"
            id="itemsPerPage"
            name="itemsPerPage"
            value={settings.itemsPerPage}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm sm:text-base"
            placeholder="10"
            min="1"
            required
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-primary-accent text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md text-base sm:text-lg"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
