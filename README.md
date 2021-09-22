# API Documentation

This is the API documentation for Xendit's assignmen

[![Build Status](https://app.travis-ci.com/andrebuntoro/backend-coding-test.svg?token=vAXnTD25TqTxyVJuE7Bw&branch=master)](https://app.travis-ci.com/andrebuntoro/backend-coding-test)

---

## Create a Ride

This API is used to record a particular ride information into the database.

#### HTTP Request

```
POST /rides
```

#### Request Body

JSON representation:

```json
{
  "data": "your_encrypted_payload"
}
```

Encryption:

- Please open `./src/utils/encrypt` for reference.

Payload:

```json
{
  "start_lat": -6.1677,
  "start_long": 106.817562,
  "end_lat": -6.135321,
  "end_long": 106.830567,
  "rider_name": "Andre",
  "driver_name": "Kevin",
  "driver_vehicle": "Tesla Model 3"
}
```

| Fields         | Required | Type   | Validation                          |
| -------------- | -------- | ------ | ----------------------------------- |
| start_lat      | yes      | number | Must be between -90 to 90 degrees   |
| start_long     | yes      | number | Must be between -180 to 180 degrees |
| end_lat        | yes      | number | Must be between -90 to 90 degrees   |
| end_long       | yes      | number | Must be between -180 to 180 degrees |
| rider_name     | yes      | string | -                                   |
| driver_name    | yes      | string | -                                   |
| driver_vehicle | yes      | string | -                                   |

#### Response Body

```json
[
  {
    "ride_id": 1,
    "start_lat": -6.1677,
    "start_long": 106.817562,
    "end_lat": -6.135321,
    "end_long": 106.830567,
    "rider_name": "Andre",
    "driver_name": "Kevin",
    "driver_vehicle": "Tesla Model 3",
    "created": "2021-09-19 07:08:50"
  }
]
```

---

## Get Rides

This API is used to get list of rides from the database.

#### HTTP Request

```
GET /rides
```

#### Query parameters

| Parameters | Required | Type   | Validation |
| ---------- | -------- | ------ | ---------- |
| limit      | yes      | number | -          |
| page       | yes      | number | -          |

#### Response Body

```json
[
  {
    "ride_id": 1,
    "start_lat": -6.1677,
    "start_long": 106.817562,
    "end_lat": -6.135321,
    "end_long": 106.830567,
    "rider_name": "Andre",
    "driver_name": "Kevin",
    "driver_vehicle": "Tesla Model 3",
    "created": "2021-09-19 07:08:50"
  }
]
```

---

## Get a Ride

This API is used to get a particular ride information with an `id`.

#### HTTP Request

```
GET /rides/:id
```

#### Path parameters

| Parameters | Required | Type   | Validation |
| ---------- | -------- | ------ | ---------- |
| id         | yes      | number | -          |

#### Response Body

```json
[
  {
    "ride_id": 1,
    "start_lat": -6.1677,
    "start_long": 106.817562,
    "end_lat": -6.135321,
    "end_long": 106.830567,
    "rider_name": "Andre",
    "driver_name": "Kevin",
    "driver_vehicle": "Tesla Model 3",
    "created": "2021-09-19 07:08:50"
  }
]
```
