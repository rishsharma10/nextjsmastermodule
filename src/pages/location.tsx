import React from 'react'
import { toast } from 'react-toastify';

const location = () => {


    type LatLng = { lat: number; lng: number };

/**
 * Calculates the distance between two lat/lng points in kilometers.
 */
function getDistance(a: LatLng, b: LatLng): number {
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const aVal = Math.sin(dLat / 2) ** 2 +
               Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculates bearing from one coordinate to another in degrees.
 */
function calculateBearing(from: LatLng, to: LatLng): number {
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const dLng = toRad(to.lng - from.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const bearingRad = Math.atan2(y, x);
  return (toDeg(bearingRad) + 360) % 360;
}

function toDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

/**
 * Returns the absolute difference between two bearings (0–180 degrees)
 */
function getAngleDifference(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Determines if user is ahead and possibly aligned with the driver's movement
 */
function isUserMovingTowardAmbulance(
  userPrev: LatLng,
  userNow: LatLng,
  driverPrev: LatLng,
  driverNow: LatLng,
  maxDistanceKm: number = 5,
  maxDirectionDiff: number = 60 // optional: degrees
): boolean {
    debugger
  const distanceBefore = getDistance(userPrev, driverPrev);
  const distanceAfter = getDistance(userNow, driverPrev);

  const inRange = distanceAfter > distanceBefore 

  if (!inRange) return false;

  const userBearing = calculateBearing(userPrev, userNow);
  const driverBearing = calculateBearing(driverPrev, driverNow);

  const angleDiff = getAngleDifference(userBearing, driverBearing);

  return angleDiff <= maxDirectionDiff;
}

const userPrev = { lat: 12.9611, lng: 77.6387 };
const userNow = { lat: 12.9625, lng: 77.6399 };
const driverPrev = { lat: 12.9500, lng: 77.6300 };
const driverNow = { lat: 12.9530, lng: 77.6330 };

const shouldNotify = isUserMovingTowardAmbulance(userPrev, userNow, driverPrev, driverPrev);

console.log(shouldNotify ?? "alertttt");


  return (
    <div>location</div>
  )
}

export default location