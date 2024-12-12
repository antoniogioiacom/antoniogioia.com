---
title: "Protomaps: open source single file maps"
date: "2024-12-10T11:30:00.284Z"
description: "Protomaps is an open-source mapping solution that consolidates map data into a single file"
filepath: "/protomaps-open-source-single-file-maps"
cover: "/images/blog/cover-protomaps.jpg"
---

# Protomaps: open source single file maps

Antonio Gioia, 2024

---

![Cover](https://antoniogioia.com/images/blog/cover-protomaps.jpg)

---

Interactive maps are a critical part of today's modern applications, but dealing with tile servers and expensive third-party APIs can turn maps into a problematic feature to maintain. When map usage grows to thousands or millions of views per day, services like _Google Maps_ or _Mapbox_ can become a significant running cost.

I encountered this challenge with one of my applications where map visualization is a core feature. As the user base grew, the monthly Google Maps bill started to become a concern, pushing me to evaluate alternative solutions that could scale more efficiently. After researching various options, I discovered Protomaps, an open-source project that fundamentally changes how map data is stored and delivered.

- [Protomaps website](https://protomaps.com)
- [Protomaps repository](https://github.com/protomaps)

Protomaps is an open-source project designed to simplify map data storage and delivery through a _single-file architecture_.

Originally developed as a solo project by [Brandon Liu](https://github.com/bdon), it later received grants and sponsorships that enabled him to work on it full-time.

Switching to Protomaps **reduced our mapping costs by over 90%** while maintaining full control over the infrastructure. This article explains how Protomaps works and provides a practical guide to implement it in your applications, based on my experience _migrating from Google Maps_ to this solution.

## Prerequisites

- Basic familiarity with terminal and command-line operations
- Basic knowledge of mapping libraries
- Basic understanding of cloud services (AWS, Cloudflare, or similar)

## Benefits of using Protomaps

- Complete control over mapping infrastructure
- Data and usage privacy for your users
- Significant cost reduction for map views
- Offline maps functionality
- Customizable styling, features and assets

## Understanding the Architecture

Protomaps utilizes **.pmtiles**, an open archive format designed for storing pyramid-structured tile data that mapping libraries can access through [HTTP Range Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests). This architecture allows developers to serve map data directly from standard infrastructure like cloud storage or CDNs, eliminating the need for dedicated tile servers. The complete world map .pmtiles file, available from the [Protomaps builds](https://maps.protomaps.com/builds) page, is approximately **120GB**, but you can extract data for specific regions or cities to create smaller files. The [Protomaps repository](https://github.com/protomaps) provides all necessary tools for managing .pmtiles files, including utilities for extracting portions of the world map and uploading them to cloud storage.

The necessary steps to use Protomaps in your project are:

- creare or get a .pmtiles file containing the desired map (entire world or partial)
- upload to cloud storage ([Amazon Aws S3](https://aws.amazon.com), [Cloudflare R2](https://www.cloudflare.com) etc) or server
- Import the map on front-end using [LeafletJs](https://leafletjs.com) or [Maplibre-GL](https://maplibre.org/maplibre-gl-js/docs)

## Create or get a .pmtiles map file

You have two options here: you can download the latest build of the whole world of about 120GB in size from [Protomaps builds](https://maps.protomaps.com/builds) or if you need only a section of the world (for example the map of europe or the map of UK) you can extract it using a tool from the [Protomaps repository](https://github.com/protomaps): `go-pmtiles`a command-line tool that is going to be useful not only to **extract** a desired map but also to **upload** it to cloud storage.

- go to [go-pmtiles releases](https://github.com/protomaps/go-pmtiles/releases/tag/v1.22.3) and download the latest executable available for your system
- go to [Protomaps builds](https://maps.protomaps.com/builds) and copy the URL of the latest world map build, for example: [https://build.protomaps.com/20240917.pmtiles](https://build.protomaps.com/20240917.pmtiles)
- get the bounding box coordinates of the map you want to extract. To calculate a bounding box you can use math if you know the coordinates of two opposite vertices or you can use any online tool that lets you draw a bounding box and copy the coordinates like [bboxfinder.com](https://bboxfinder.com)

Let's assume that we want to extract the map of the italian Puglia region, the bounding box is defined by the coordinates in the format [longitude, latitude]:

- Southwest corner: [14.952521, 39.718345]
- Northeast corner: [18.632941, 42.121209]

When using these coordinates with the `pmtiles extract` command, we list them in order: west longitude, south latitude, east longitude, north latitude. Run on terminal, in the folder were `go-pmtiles` is unpacked:

```
./pmtiles extract https://build.protomaps.com/20240917.pmtiles puglia.pmtiles --bbox=14.952521,39.718345,18.632941,42.121209 --maxzoom=14
```

This command will create a `puglia.pmtiles` file containing the map tiles and all sorts of layers (street names, buildings, pois, landmarks [and more](https://docs.protomaps.com/basemaps/layers)) with the (optional) `maxzoom` set to 14. The maxzoom parameter can help to reduce file size especially if in your app you don't need deep level of zoom (each level of zoom doubles the number of tiles of the previous level).

The `puglia.pmtiles` map file is just about 200MB in size and we can now upload it to a storage accessible by our apps. Such a small size is convenient if we want to store it on [Github Pages](https://pages.github.com) or even on our ([properly configured](https://docs.protomaps.com/pmtiles/cloud-storage#http-servers)) webserver.

## Upload map file to cloud storage

A much better option is cloud storage because it enables scaling, better performance, CDN and more. We can upload our maps to services like Aws S3 or Cloudflare R2 with the command-line tool `go-pmtiles` but first we need some extra configuration. In front of the buckets containing the map(s) files we setup a Lambda or a Worker function and we configure it to handle file on bucket. The documentation website has guides for AWS, Cloudflare, Google Cloud and other cloud providers.

- [AWS with CloudFormation guide](https://docs.protomaps.com/deploy/aws)
- [Cloudflare R2 with Worker](https://docs.protomaps.com/deploy/cloudflare)

Once the setup is done you can use the cloud provider UI to upload the maps files on the bucket. The upload form have size limitations and if your file is very large you can use `go-pmtiles`.

On the Protomaps Docs website there's a page dedicated to the CLI tool and its various options, in the [upload](https://docs.protomaps.com/pmtiles/cli#upload) section you can find more info on how to set values according to the cloud provider. Here's an example on how to use `go-pmtiles` to upload the `puglia.pmtiles` file on Cloudflare (you will need to create an API key and secret on the service dashboard and `export` them on your terminal session).

```
./pmtiles upload puglia.pmtiles puglia.pmtiles --bucket=s3://maps\?endpoint=https://abcd.r2.cloudflarestorage.com\&region=auto
```

## Use the maps on front-end

We finally have our map files somewhere reachable via internet and we can use it to display a map on our website or apps. The most common javascript libraries are supported:

- [LeafletJs](https://leafletjs.com)
- [Maplibre-GL](https://maplibre.org/maplibre-gl-js/docs)
- [Openlayers](https://openlayers.org/)

Leaflet is a lightweight, well-documented JavaScript library for interactive maps. For more demanding applications, MapLibre GL offers WebGL-powered rendering that delivers smooth performance with vector tiles, large datasets, dynamic styling and 3D features.

In order to be able to use `.pmtiles` files you will need to install the package `pmtiles`:

```
npm i pmtiles
```

### Leaflet

If you use Leaflet, you will need to use the package `protomaps-leaflet`:

```
import { useRef } from "react";
import { leafletLayer } from "protomaps-leaflet";

// ...

const mapEl = useRef(null);

const map = L.map(mapEl.current, {
    zoomSnap: 0.1,
    maxZoom: 16,
    zoomAnimation: true,
});

const tiles = leafletLayer({
    url: "https://abcd.cloudfront.net/puglia/{z}/{x}/{y}.mvt",
    attribution: "© OpenStreetMap",
    theme: "light", // <- don't forget this!
});
tiles.addTo(map);

return (
    <div
        id="map"
        ref={mapEl}
        style={{ width: "100%", height: "600px" }}
    />
);
```

This is a simplified example, to know more check the [Protomaps Leaflet docs](https://docs.protomaps.com/pmtiles/leaflet).

### Maplibre-GL

While Leaflet is great for browser compatibility, ease of use and lightweight footprint, I prefer to work with MapLibre GL because I can customize the map in any detail I want and the map feels more snappy and with smooth zooming.

To use MapLibre to show our map first we need to initialize the PMTiles protocol. I show you an example on how to register the PMTiles protocol with MapLibre. This code ensures this initialization happens only once, after that, the protocol can be used to load map tiles stored in the PMTiles format:

```
// /lib/mapProtocol.js

import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';

let isInitialized = false;

export function initializeMapProtocol() {
  if (!isInitialized) {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
    isInitialized = true;
  }
}

export function isMapProtocolReady() {
  return isInitialized;
}
```

In our map component we would have something like this:

```
// /components/Map.js

import { useEffect, useRef } from 'react';
import maplibregl, { NavigationControl } from 'maplibre-gl';
import { isMapProtocolReady } from '@/lib/mapProtocol';

// ...

const mapEl = useRef(null);
const containerEl = useRef(null);

useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isMapProtocolReady()) return;

    mapEl.current = new maplibregl.Map({
      container: containerEl.current,
      style: {
        layers: [...], // check docs for basemap styles
        pitch: 0,
        glyphs: '/fonts/{fontstack}/{range}.pbf',
        sprite: '/sprites/v3/light',
        bearing: 0,
        sources: {
          protomaps: {
            type: 'vector',
            tiles: ["https://abcd.cloudfront.net/puglia/{z}/{x}/{y}.mvt"],
            attribution: '© OpenStreetMaps',
          },
        },
        version: 8,
      },
      center: [16.866667, 41.125278] // [lng, lat],
      zoom: 10,
    });

    mapEl.current.addControl(new NavigationControl(), 'top-right');

    mapEl.current.on('load', async () => {

        // here you can load layers, markers, polygons etc

    });

    return () => {
      if (mapEl.current) {
        mapEl.current.remove();
      }
    };

}, []);

return (
    <div
        id="map"
        ref={containerEl}
        style={{ width: "100%", height: `600px` }}
      />
)

```

Check [Protomaps MapLibre docs](https://docs.protomaps.com/pmtiles/maplibre) for more informations.

## Final considerations

Protomaps provides a practical alternative to services like Google Maps or Mapbox, putting control of your map infrastructure back in your hands at a fraction of the cost. Having explored its implementation in real projects, here are some key considerations to help you choose the best setup for your needs.

### Online or offline maps

Having the maps contained in a single file gives you the freedom to render maps both in online and offline scenarios. You can build _your own Google Maps_ on a Raspberry PI for fun or you can create an app for hikers or any other activity that take place in a place without internet connection.

The single-file architecture of Protomaps enables both online and offline map rendering, opening up possibilities for various applications. You could build _your own Google Maps_ on a Raspberry Pi for fun, create offline-capable mobile apps for outdoor enthusiasts, or develop location-based applications that work reliably in areas with limited internet connectivity or critical services that must be functioning during network outages.

## Cost vs latency

The cheapest way to store and use the `pmtiles` files is with Cloudflare R2 setup because it does not have bandwidth fees, only per-request fees. R2 also supports HTTP/2.

Check the [Cost calculator](https://docs.protomaps.com/deploy/cost) on the Protomaps website.

10M tile requests/month can cost up to around **$3,600** with Google Maps, around **$120** using AWS S3, and around **$11** on Cloudflare R2.

The trade-off with Cloudflare R2 is latency: about 500ms compared to around 200ms with other cloud providers. This latency difference is noticeable when rendering maps, but if your application doesn't require fast loading times or heavy map interactions, you can opt for the higher-latency but more cost-effective option.

## Know your target

Your target market should influence which mapping library you choose. For markets with poor internet connectivity and less powerful devices, Leaflet is the better choice since MapLibre can be too resource-intensive and may not effectively utilize hardware acceleration on these devices.

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article, contact me at [info@antoniogioia.com](mailto:info@antoniogioia.com).
