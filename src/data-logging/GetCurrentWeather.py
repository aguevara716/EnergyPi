import urllib.request
import urllib.parse
import json
import sys
import mysql.connector as mariadb
from datetime import datetime
from configparser import ConfigParser

def get_current_conditions():
    config = ConfigParser()
    config.read(weather_settings_file)
    latitude = config.getfloat("main", "latitude")
    longitude = config.getfloat("main", "longitude")
    api_key = config.get("main", "openweathermap_api_key")

    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&units=imperial&appid={api_key}"
    response = urllib.request.urlopen(url)
    json_response = response.read().decode("utf-8")
    json_obj = json.loads(json_response)
    current_conditions = json_obj["main"]
    return current_conditions


def get_timestamp_as_string():
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")
    return current_time


def write_to_database(timestamp, temperature_f, humidity):
    config = ConfigParser()
    config.read(db_settings_file)
    username = config.get("main", "user")
    password = config.get("main", "password")
    database = config.get("main", "database")
    host = config.get("main", "host")

    mariadb_connection = mariadb.connect(user=username, password=password, database=database, host=host)
    sqlCommand = f"INSERT INTO WeatherLogs (Timestamp, TemperatureFahrenheit, Humidity) VALUES ('{timestamp}', {temperature_f}, {humidity})"
    print(sqlCommand)
    cursor = mariadb_connection.cursor()
    cursor.execute(sqlCommand)
    mariadb_connection.commit()
    mariadb_connection.close()


if len(sys.argv) != 3:
    print("Incorrect number of args specified")
    sys.exit(1)

weather_settings_file = sys.argv[1]
db_settings_file = sys.argv[2]

current_conditions = get_current_conditions()
timestamp = get_timestamp_as_string()
temperature_f = current_conditions["temp"]
humidity = current_conditions["humidity"]

write_to_database(timestamp, temperature_f, humidity)
