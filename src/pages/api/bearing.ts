// pages/api/bearing.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as turf from '@turf/turf';

let COORIDOOR_SECONDARY = 6;
let COORIDOOR_RESIDENTIAL = 6;
let DESTINATION_DISTANCE = 500; // meters
let BEARING_DISTANCE = 65; // degrees

function isUserInSameDirection(driverCoord: [number, number], userCoord: [number, number]): boolean {
  const from = turf.point(driverCoord); // [lon, lat]
  const to = turf.point(userCoord);     // [lon, lat]

  const bearing = turf.bearing(from, to);
  const driverBearing = 0; // Replace with actual bearing if known

  const angleDiff = Math.abs(bearing - driverBearing) % 360;
  const smallestAngle = angleDiff > 180 ? 360 - angleDiff : angleDiff;

  return smallestAngle <= 45;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { from, to, users } = req.body;

    if (
      !from || !to || !users || !Array.isArray(users) ||
      !from.lat || !from.lon || !to.lat || !to.lon
    ) {
      return res.status(400).json({ message: 'Missing or invalid coordinates' });
    }

    // Create driver route line
    const routeCoords = [
      [from.lon, from.lat],
      [to.lon, to.lat],
    ];


    const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.NEXT_PUBLIC_API_KEY_ROAD}&start=${from.lon},${from.lat}&end=${to.lon},${to.lat}`);
    const data = await response.json();
    console.log(data,'datttaa');
    
    const coordinates = data?.features[0]?.geometry?.coordinates;




    const line = turf.lineString(coordinates);

    // Fetch road info
    // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${from.lat}&lon=${from.lon}`;
    // const response = await fetch(url);
    // const dataRoad = await response.json();

    // const ACTUAL_COORIDOR =
    //   dataRoad?.type === 'secondary'
    //     ? COORIDOOR_SECONDARY
    //     : dataRoad?.type === 'residential'
    //     ? COORIDOOR_RESIDENTIAL
    //     : COORIDOOR_SECONDARY;

    // Create buffer zone
    const buffer: any = turf.buffer(line, COORIDOOR_SECONDARY, { units: 'meters' });

    const results = users.map((user: any) => {
      if (!user.lat || !user.lon) return null;

      const userPoint = turf.point([user.lon, user.lat]);

      const distanceInKm = turf.distance(turf.point([from.lon, from.lat]), userPoint, { units: 'kilometers' });
      const distanceInMeters = distanceInKm * 1000;

      const bearing = turf.bearing(turf.point([from.lon, from.lat]), userPoint);
      const isInsideCorridor = turf.booleanPointInPolygon(userPoint, buffer);

      const isInDistance = distanceInMeters <= DESTINATION_DISTANCE;
      const isBearing = bearing <= BEARING_DISTANCE;
      const directionMatch = isUserInSameDirection([from.lon, from.lat], [user.lon, user.lat]);

      const shouldAlert = isInDistance && isBearing && isInsideCorridor;

      return {
        coordinates:user,
        distanceInMeters,
        bearing,
        isInsideCorridor,
        directionMatch,
        shouldAlert,
      };
    }).filter(Boolean);

    return res.status(200).json({
    //   roadInfo: dataRoad,
      users: results,
    });
  } catch (error) {
    console.error('Error calculating:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
