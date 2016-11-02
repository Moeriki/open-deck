import Room from '../entities/Room';

const DEFAULT_MAX_DISTANCE_IN_METERS = 100;

const EARTH_RADIUS_IN_METERS = 6371000;

/**
* @param {object} location
* @param {number} location.longitude
* @param {number} location.latitude
* @param {object} options
* @param {number} options.maxDistance expressed in meters
* @return {Promise<Array<Room>>}
 */
export function findNearLocation(
  {
    longitude,
    latitude,
  },
  {
    maxDistance = DEFAULT_MAX_DISTANCE_IN_METERS,
  },
) {
  const maxDistanceInRadians = maxDistance / EARTH_RADIUS_IN_METERS;

  return Room.find({
    location: {
      $near: [longitude, latitude],
      $maxDistance: maxDistanceInRadians,
    },
  });
}
