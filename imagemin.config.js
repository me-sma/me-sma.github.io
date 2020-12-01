module.exports = {
    "gifsicle": { "optimizationLevel": 2, "interlaced": false, "colors": 10 },
    "mozjpeg": { "progressive": true, "quality": 100 },
    "pngquant": { "quality": [1] },
    "svgo": {
      "plugins": [
        { "removeViewBox": false },
        { "cleanupIDs": true },
      ]
    },
    "webp": { "quality": 100 }
  }
   