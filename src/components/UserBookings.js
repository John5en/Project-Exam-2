import { useEffect, useState } from "react";

function useUserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const profileName = localStorage.getItem("name");

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken || !profileName) {
          console.error("Access token or profile name is missing.");
          return;
        }

        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${profileName}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserBookings(data);
        } else {
          console.error("Failed to fetch user bookings:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [profileName]);

  return userBookings;
}

export default useUserBookings;
