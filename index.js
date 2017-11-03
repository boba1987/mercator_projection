export function getGridCoords(googleInstance, mapZoom, coords) {
  const position = getGridIndex(googleInstance, mapZoom, coords.lat, coords.lng);

  return {
    north: tile2lat(position.y/2, mapZoom),
    west: tile2long(position.x/2, mapZoom),
    east:tile2long(position.x/2, mapZoom) + (tile2long(position.x+1/2, mapZoom) - tile2long(position.x, mapZoom)),
    south: tile2lat(position.y/2, mapZoom) - (tile2lat(position.y/2, mapZoom) - tile2lat(position.y/2+1, mapZoom))/2
  };
}

export function getGridIndex(googleInstance, mapZoom, lat, lng) {
  const scale = 1 << mapZoom;
  const worldCoordinate = projection(googleInstance, lat, lng);
  const tileCoordinate = new googleInstance.maps.Point(
                          Math.floor(worldCoordinate.x * scale / 128*2),
                          Math.floor(worldCoordinate.y * scale / 128*2));

  return {
    x: tileCoordinate.x,
    y: tileCoordinate.y
  };
}

export function projection(googleInstance, lat, lng) {
  let siny = Math.sin(lat * Math.PI / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new googleInstance.maps.Point(
      128 * (0.5 + lng / 360),
      128 * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

export function tile2long(x,z) {
  return (x/Math.pow(2,z)*360-180);
}

export function tile2lat(y,z) {
  const n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
