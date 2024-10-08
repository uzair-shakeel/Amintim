import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BaseURL, { IMAGES_BASE_URL } from "../../utils/BaseURL";
axios.defaults.withCredentials = true;

const SettingsTab = () => {
  const [avatar, setAvatar] = useState();
  const [updatedProfileImage, setUpdatedProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    zipcode: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        });
        const { firstName, lastName, city, country, zipcode, profileImage } =
          response.data;
        setFormData({ firstName, lastName, city, country, zipcode });
        console.log("ihihihi", response);
        if (profileImage) {
          setAvatar(profileImage);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BaseURL}/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const { url } = response.data;
        setAvatar(url);
        // console.log(url);
        toast.success("Avatar updated successfully");
      } else {
        toast.error("Error updating avatar. Please try again.");
      }
    } catch (error) {
      // console.log("not runnnong", error);
      toast.error("Error updating avatar. Please try again.");
    }
  };

  // const handleAvatarChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post(`${BaseURL}/users/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       const { filename } = response.data;
  //       setAvatar(filename);
  //       toast.success("Avatar updated successfully");
  //     } else {
  //       toast.error("Error updating avatar. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Error updating avatar. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
      const response = await axios.put(
        `${BaseURL}/users/update`,
        {
          ...formData,
          profileImage: avatar,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );

      if (response.status === 200) {
        toast.success("User details updated successfully");
      } else {
        toast.error("Error updating user details. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating user details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* <div className="flex justify-center mb-8">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label htmlFor="avatar-upload">
            <div className="w-24 h-24 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <img
                  src={`/src/assets/avatar.png`}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          </label>
        </div>
      </div> */}
      <form className="space-y-4 w-full py-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Prenume</label>
          <input
            type="text"
            name="firstName"
            value={formData?.firstName || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Prenume"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nume</label>
          <input
            type="text"
            name="lastName"
            value={formData?.lastName || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Nume"
          />
        </div>
        <div>
          <label className="block text-gray-700">Oras</label>
          <input
            type="text"
            name="city"
            value={formData?.city || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-gray-700">Judet</label>
          <input
            type="text"
            name="country"
            value={formData?.country || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-gray-700">Zip/Cod Postal</label>
          <input
            type="text"
            name="zipcode"
            value={formData?.zipcode || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Cod Postal"
          />
        </div>

        <button className="flex w-full p-3 text-center items-center justify-center bg-black/90 text-white rounded-full hover:bg-black duration-200">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
