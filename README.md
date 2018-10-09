## mercator_projection

#Javascript implementation of https://en.wikipedia.org/wiki/Mercator_projection

Usage:

```
/**
 * Generates grid overlay on google map instance and sets the viewport on provided lat and lng
 * @param {object} a
 * @param {number} lat
 * @param {number} lng
 * @returns {object}
 */
function projection(googleInstance, lat, lng) {...
```


```
/**
 * Returns object with coordinates of clicked/selected grid tile
 * @param {object} googleInstance
 * @param {number} mapZoom
 * @param {object} coords
 * @returns {object}
 */
function getGridCoords(googleInstance, mapZoom, coords)  {...
```
