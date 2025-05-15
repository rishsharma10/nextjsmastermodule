import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function LocationTracker() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  const driverCoord: [number, number] = [30.715110, 76.691347];
  const destCoord: [number, number] = [30.721510, 76.701702];

  // 1️⃣ Polling user's location every 10 seconds

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      console.warn('Geolocation not available');
      return;
    }

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          console.log('📍 Updated location:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('❌ Geolocation error:', error);
        }
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 2️⃣ Trigger turf API call on location change
  useEffect(() => {
    // if (!location) return;

    const initTurfApiCall = async () => {
      const payload = {
        from: {
          lat: driverCoord[0],
          lon: driverCoord[1],
        },
        to: {
          lat: destCoord[0],
          lon: destCoord[1],
        },
        users: [
          {
            lat: 30.715253,
            lon: 76.691599,
          },
          {
            lat: 30.715542,
            lon: 76.692057,
          },
          {
            lat: 30.715479,
            lon: 76.692137,
          },
          {
            lat: 30.714861,
            lon: 76.691216,
          },
        ],
      };

      try {
        const apiRes = await fetch('/api/bearing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
console.log(apiRes,'apiResapiRes')
        const data = await apiRes.json();
        const resp = data?.users?.[0];

        if (resp?.shouldAlert) {
          toast.success(`🚨 ALERT: Inside corridor\n📐 Bearing: ${resp.bearing.toFixed(2)}°\n📏 Distance: ${resp.distanceInMeters.toFixed(2)}m`);
        } else {
          toast.warning(`⚠️ Outside range\n📐 Bearing: ${resp?.bearing.toFixed(2)}°\n📏 Distance: ${resp?.distanceInMeters.toFixed(2)}m`);
        }
      } catch (error) {
        console.error('API call error:', error);
        toast.error('Failed to check direction');
      }
    };

    initTurfApiCall();
  }, []);

  return (
    <div>
      <h2>🚦 Live Location Tracker</h2>
      {location ? (
        <p>
          Current Location: <strong>{location.lat.toFixed(6)}, {location.lon.toFixed(6)}</strong>
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
