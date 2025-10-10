from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import math

app = Flask(__name__)
CORS(app)

instruments_data = {
    "samrat_yantra": {
        "name": "Samrat Yantra",
        "description": "The Supreme Instrument - A giant sundial that accurately measures time and the sun's position. It consists of a triangular gnomon and quadrant arcs.",
        "history": "Built by Maharaja Jai Singh II in the 18th century, this is the largest sundial in the world at Jantar Mantar observatories.",
        "purpose": "Measures local time with accuracy up to 2 seconds, tracks sun's declination and altitude.",
        "type": "sundial"
    },
    "bhitti_yantra": {
        "name": "Bhitti Yantra",
        "description": "Wall Instrument - A wall-mounted instrument used to measure the altitude and azimuth of celestial objects.",
        "history": "Part of the astronomical arsenal at Jantar Mantar, used for precise celestial observations.",
        "purpose": "Measures altitude and azimuth of celestial bodies, helps in astronomical calculations.",
        "type": "celestial_tracker"
    },
    "nadi_valaya_yantra": {
        "name": "Nadi Valaya Yantra",
        "description": "Equinoctial Sundial - Two circular instruments representing the celestial equator, used to determine time.",
        "history": "An innovative design by Jai Singh II, using dual hemispheres to work year-round.",
        "purpose": "Measures time throughout the year, particularly accurate during equinoxes.",
        "type": "equinoctial_sundial"
    }
}

def calculate_solar_declination(day_of_year):
    declination = 23.45 * math.sin(math.radians((360 / 365) * (day_of_year - 81)))
    return declination

def calculate_hour_angle(hour, minute):
    time_decimal = hour + minute / 60
    hour_angle = 15 * (time_decimal - 12)
    return hour_angle

def calculate_solar_altitude(latitude, declination, hour_angle):
    lat_rad = math.radians(latitude)
    dec_rad = math.radians(declination)
    ha_rad = math.radians(hour_angle)
    
    altitude = math.degrees(math.asin(
        math.sin(lat_rad) * math.sin(dec_rad) +
        math.cos(lat_rad) * math.cos(dec_rad) * math.cos(ha_rad)
    ))
    return altitude

def calculate_solar_azimuth(latitude, declination, hour_angle, altitude):
    lat_rad = math.radians(latitude)
    dec_rad = math.radians(declination)
    ha_rad = math.radians(hour_angle)
    alt_rad = math.radians(altitude)
    
    azimuth = math.degrees(math.acos(
        (math.sin(dec_rad) - math.sin(lat_rad) * math.sin(alt_rad)) /
        (math.cos(lat_rad) * math.cos(alt_rad))
    ))
    
    if hour_angle > 0:
        azimuth = 360 - azimuth
    
    return azimuth

def calculate_equinox_solstice_date(year, event_type):
    Y = (year - 2000) / 1000.0
    
    if event_type == 'vernal_equinox':
        JDE = 2451623.80984 + 365242.37404 * Y + 0.05169 * Y**2 - 0.00411 * Y**3 - 0.00057 * Y**4
    elif event_type == 'summer_solstice':
        JDE = 2451716.56767 + 365241.62603 * Y + 0.00325 * Y**2 + 0.00888 * Y**3 - 0.00030 * Y**4
    elif event_type == 'autumnal_equinox':
        JDE = 2451810.21715 + 365242.01767 * Y - 0.11575 * Y**2 + 0.00337 * Y**3 + 0.00078 * Y**4
    elif event_type == 'winter_solstice':
        JDE = 2451900.05952 + 365242.74049 * Y - 0.06223 * Y**2 - 0.00823 * Y**3 + 0.00032 * Y**4
    else:
        JDE = 2451623.80984
    
    jd_epoch = 2451545.0
    days_offset = JDE - jd_epoch
    base_date = datetime(2000, 1, 1, 12, 0, 0)
    result_date = base_date + timedelta(days=days_offset)
    
    return result_date

def calculate_eclipse_events(year):
    eclipse_catalog = {
        2023: [
            {"name": "Solar Eclipse", "date": "2023-04-20", "description": "Hybrid solar eclipse - Indian Ocean, Indonesia, Australia", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2023-05-05", "description": "Penumbral lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2023-10-14", "description": "Annular solar eclipse - Western Africa, North and South America", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2023-10-28", "description": "Partial lunar eclipse", "type": "eclipse"},
        ],
        2024: [
            {"name": "Lunar Eclipse", "date": "2024-03-25", "description": "Penumbral lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2024-04-08", "description": "Total solar eclipse - Mexico, USA, Canada", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2024-09-18", "description": "Partial lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2024-10-02", "description": "Annular solar eclipse - Pacific, Chile, Argentina", "type": "eclipse"},
        ],
        2025: [
            {"name": "Lunar Eclipse", "date": "2025-03-14", "description": "Total lunar eclipse - Pacific, Americas, Western Europe", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2025-03-29", "description": "Partial solar eclipse - Northwest Africa, Europe, Russia", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2025-09-07", "description": "Total lunar eclipse - Europe, Africa, Asia, Australia", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2025-09-21", "description": "Partial solar eclipse - South Pacific, New Zealand, Antarctica", "type": "eclipse"},
        ],
        2026: [
            {"name": "Solar Eclipse", "date": "2026-02-17", "description": "Annular solar eclipse - Southern Africa, Antarctica", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2026-03-03", "description": "Total lunar eclipse - Eastern Asia, Australia, Pacific, Americas", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2026-08-12", "description": "Total solar eclipse - Arctic, Greenland, Iceland, Spain", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2026-08-28", "description": "Partial lunar eclipse - Eastern Americas, Europe, Africa, Asia", "type": "eclipse"},
        ],
        2027: [
            {"name": "Solar Eclipse", "date": "2027-02-06", "description": "Annular solar eclipse - South America, Atlantic, Africa", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2027-02-20", "description": "Penumbral lunar eclipse", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2027-07-18", "description": "Penumbral lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2027-08-02", "description": "Total solar eclipse - North Africa, Southern Europe, Arabia", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2027-08-17", "description": "Penumbral lunar eclipse", "type": "eclipse"},
        ],
        2028: [
            {"name": "Lunar Eclipse", "date": "2028-01-12", "description": "Partial lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2028-01-26", "description": "Annular solar eclipse - Pacific, Ecuador, South America, Europe", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2028-07-06", "description": "Partial lunar eclipse", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2028-07-22", "description": "Total solar eclipse - Indian Ocean, Australia, New Zealand", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2028-12-31", "description": "Total lunar eclipse - Europe, Africa, Asia, Australia, Pacific", "type": "eclipse"},
        ],
        2029: [
            {"name": "Solar Eclipse", "date": "2029-01-14", "description": "Partial solar eclipse - North America, Central America, North Africa", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2029-06-12", "description": "Partial solar eclipse - Arctic, Scandinavia, Alaska, North Asia", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2029-06-26", "description": "Total lunar eclipse - Americas, Europe, Africa, Middle East", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2029-07-11", "description": "Partial solar eclipse - Southern Chile, Southern Argentina", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2029-12-05", "description": "Partial solar eclipse - South America, Antarctica, South Atlantic", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2029-12-20", "description": "Total lunar eclipse - Americas, Europe, Africa, Asia", "type": "eclipse"},
        ],
        2030: [
            {"name": "Solar Eclipse", "date": "2030-06-01", "description": "Annular solar eclipse - North Africa, Europe, Asia, Arctic", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2030-06-15", "description": "Partial lunar eclipse - Europe, Africa, Asia, Australia", "type": "eclipse"},
            {"name": "Solar Eclipse", "date": "2030-11-25", "description": "Total solar eclipse - Southern Africa, Indian Ocean, Australia", "type": "eclipse"},
            {"name": "Lunar Eclipse", "date": "2030-12-09", "description": "Penumbral lunar eclipse", "type": "eclipse"},
        ],
    }
    
    if year in eclipse_catalog:
        return eclipse_catalog[year]
    
    synodic_month = 29.530588
    eclipse_season_period = 173.31
    
    base_year = 2025
    if year < 2023:
        base_year = 2024
    elif year > 2030:
        base_year = 2030
    
    base_eclipses = eclipse_catalog.get(base_year, [])
    year_diff = year - base_year
    
    estimated_eclipses = []
    for eclipse in base_eclipses[:2]:
        base_date = datetime.strptime(eclipse['date'], '%Y-%m-%d')
        eclipse_cycles = year_diff * 2
        estimated_date = base_date + timedelta(days=eclipse_cycles * eclipse_season_period)
        
        estimated_eclipses.append({
            "name": eclipse['name'],
            "date": estimated_date.strftime("%Y-%m-%d"),
            "description": eclipse['description'] + " (estimated)",
            "type": "eclipse"
        })
    
    return estimated_eclipses

def calculate_celestial_events(year):
    events = []
    
    vernal_equinox = calculate_equinox_solstice_date(year, 'vernal_equinox')
    events.append({
        "name": "Vernal Equinox",
        "date": vernal_equinox.strftime("%Y-%m-%d"),
        "description": "Spring equinox - day and night are equal",
        "type": "equinox"
    })
    
    summer_solstice = calculate_equinox_solstice_date(year, 'summer_solstice')
    events.append({
        "name": "Summer Solstice",
        "date": summer_solstice.strftime("%Y-%m-%d"),
        "description": "Longest day of the year in Northern Hemisphere",
        "type": "solstice"
    })
    
    autumnal_equinox = calculate_equinox_solstice_date(year, 'autumnal_equinox')
    events.append({
        "name": "Autumnal Equinox",
        "date": autumnal_equinox.strftime("%Y-%m-%d"),
        "description": "Fall equinox - day and night are equal",
        "type": "equinox"
    })
    
    winter_solstice = calculate_equinox_solstice_date(year, 'winter_solstice')
    events.append({
        "name": "Winter Solstice",
        "date": winter_solstice.strftime("%Y-%m-%d"),
        "description": "Shortest day of the year in Northern Hemisphere",
        "type": "solstice"
    })
    
    eclipse_events = calculate_eclipse_events(year)
    events.extend(eclipse_events)
    
    events.sort(key=lambda x: x['date'])
    
    return events

@app.route('/api/instruments', methods=['GET'])
def get_instruments():
    return jsonify(instruments_data)

@app.route('/api/dimensions', methods=['POST'])
def calculate_dimensions():
    data = request.json
    latitude = data.get('latitude', 28.6139)
    longitude = data.get('longitude', 77.2090)
    
    lat_rad = math.radians(latitude)
    
    samrat_height = 20
    samrat_gnomon_angle = latitude
    samrat_base_width = samrat_height / math.tan(lat_rad)
    samrat_arc_radius = samrat_height / math.sin(lat_rad)
    
    bhitti_height = 15
    bhitti_width = 10
    bhitti_arc_radius = 8
    
    nadi_radius = 5
    nadi_tilt_angle = latitude
    nadi_thickness = 0.3
    
    dimensions = {
        "samrat_yantra": {
            "height": round(samrat_height, 2),
            "gnomon_angle": round(samrat_gnomon_angle, 2),
            "base_width": round(samrat_base_width, 2),
            "arc_radius": round(samrat_arc_radius, 2),
            "quadrant_divisions": 12
        },
        "bhitti_yantra": {
            "height": round(bhitti_height, 2),
            "width": round(bhitti_width, 2),
            "arc_radius": round(bhitti_arc_radius, 2),
            "azimuth_range": 360,
            "altitude_range": 90
        },
        "nadi_valaya_yantra": {
            "radius": round(nadi_radius, 2),
            "tilt_angle": round(nadi_tilt_angle, 2),
            "thickness": round(nadi_thickness, 2),
            "hemisphere_count": 2
        },
        "location": {
            "latitude": latitude,
            "longitude": longitude
        }
    }
    
    return jsonify(dimensions)

@app.route('/api/shadow', methods=['POST'])
def calculate_shadow():
    data = request.json
    latitude = data.get('latitude', 28.6139)
    hour = data.get('hour', 12)
    minute = data.get('minute', 0)
    day_of_year = data.get('day_of_year', 80)
    
    declination = calculate_solar_declination(day_of_year)
    hour_angle = calculate_hour_angle(hour, minute)
    altitude = calculate_solar_altitude(latitude, declination, hour_angle)
    azimuth = calculate_solar_azimuth(latitude, declination, hour_angle, altitude)
    
    shadow_length = 20 / math.tan(math.radians(altitude)) if altitude > 0 else 100
    shadow_angle = azimuth
    
    shadow_data = {
        "shadow_length": round(shadow_length, 2),
        "shadow_angle": round(shadow_angle, 2),
        "solar_altitude": round(altitude, 2),
        "solar_azimuth": round(azimuth, 2),
        "solar_declination": round(declination, 2),
        "hour_angle": round(hour_angle, 2),
        "time": f"{hour:02d}:{minute:02d}"
    }
    
    return jsonify(shadow_data)

@app.route('/api/celestial-tracking', methods=['POST'])
def celestial_tracking():
    data = request.json
    latitude = data.get('latitude', 28.6139)
    hour = data.get('hour', 12)
    day_of_year = data.get('day_of_year', 80)
    
    declination = calculate_solar_declination(day_of_year)
    hour_angle = calculate_hour_angle(hour, 0)
    altitude = calculate_solar_altitude(latitude, declination, hour_angle)
    azimuth = calculate_solar_azimuth(latitude, declination, hour_angle, altitude)
    
    tracking_data = {
        "altitude": round(altitude, 2),
        "azimuth": round(azimuth, 2),
        "declination": round(declination, 2),
        "celestial_path": []
    }
    
    for h in range(6, 19):
        ha = calculate_hour_angle(h, 0)
        alt = calculate_solar_altitude(latitude, declination, ha)
        if alt > 0:
            az = calculate_solar_azimuth(latitude, declination, ha, alt)
            tracking_data["celestial_path"].append({
                "hour": h,
                "altitude": round(alt, 2),
                "azimuth": round(az, 2)
            })
    
    return jsonify(tracking_data)

@app.route('/api/astronomical-calendar', methods=['GET'])
def astronomical_calendar():
    year = request.args.get('year', datetime.now().year, type=int)
    events = calculate_celestial_events(year)
    
    return jsonify({
        "year": year,
        "events": events
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Heritage Astronomy API is running"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
