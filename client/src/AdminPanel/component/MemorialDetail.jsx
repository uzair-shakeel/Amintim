import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BASE_URL from "../../utils/BaseURL";

const MemorialDetails = () => {
  const { id } = useParams();
  const [memorial, setMemorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemorialDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/memorial/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch memorial details.");
        }

        setMemorial(data);
      } catch (error) {
        toast.error(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemorialDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!memorial) {
    return <div>No memorial details found.</div>;
  }

  const { user, tributes } = memorial;

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-center mb-5 font-semibold text-2xl">
        Memorial Details
      </h1>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h2 className="mb-4 text-xl font-semibold underline">
          Memorial Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-bold">Title:</p>
            <p>{memorial.title}</p>
          </div>
          <div>
            <p className="font-bold">Owner Name:</p>
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <p className="font-bold">Is Human:</p>
            <p>{memorial.isHuman ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-bold">Birth Date:</p>
            <p>{new Date(memorial.birthDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-bold">Death Date:</p>
            <p>{new Date(memorial.deathDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-bold">Note:</p>
            <p>{memorial.note}</p>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold underline">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memorial.gallery?.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow">
              <img
                src={image}
                alt="Memorial Gallery"
                className="w-full h-auto rounded mb-3"
              />
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-semibold underline">Tributes</h2>
        {tributes.map((tribute, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-4"
          >
            <div>
              <p className="font-bold">{tribute.firstName}'s Message:</p>
              <p>{tribute?.message}</p>
            </div>
            <div>
              <p className="font-bold">Posted At:</p>
              <p>{new Date(tribute.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemorialDetails;