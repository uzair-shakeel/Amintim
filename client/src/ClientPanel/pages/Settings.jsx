import React, { useEffect, useState } from "react";
import SettingsTab from "../components/Settings";
import SoulStarsTab from "../components/Soulstar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("SoulStars");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[100px] min-h-screen bg-white">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Contul tau</h2>
        <p className="text-gray-600 mb-4 text-center">
          Gestioneaza paginile memoriale create si setarile contului tau.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => handleTabClick("SoulStars")}
            className={`flex-grow p-3 text-center ${
              activeTab === "SoulStars"
                ? "bg-black text-white rounded-full"
                : "border-2 border-gray-300 text-gray-500 rounded-full"
            }`}
          >
            Pagini Memoriale
          </button>
          <button
            onClick={() => handleTabClick("Settings")}
            className={`flex-grow p-3 text-center ${
              activeTab === "Settings"
                ? "bg-black text-white rounded-full"
                : "border-2 border-gray-300 text-gray-500 rounded-full"
            }`}
          >
            Setari
          </button>
        </div>
        {activeTab === "SoulStars" ? (
          <SoulStarsTab />
        ) : (
          <SettingsTab
            avatar={avatar}
            handleAvatarChange={handleAvatarChange}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
