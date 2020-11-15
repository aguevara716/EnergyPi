import subprocess
import shlex
import json
import sys
import mysql.connector as mariadb
from datetime import datetime
from dateutil import parser
from configparser import ConfigParser

def run_command(command):
    print("Launching rtlamr")
    process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
    print("listening for output...")
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            parse_output(output.strip())
    rc = process.poll()
    return rc


def parse_output(meter_broadcast):
    print("-----BEGIN-----")
    meter_broadcast = meter_broadcast.replace("b'", "")
    print(f"\"{meter_broadcast}\"")
    json_obj = json.loads(meter_broadcast)
    timestampString = json_obj["Time"]
    datetime_format = "%Y-%m-%d %H:%M:%S"
    broadcast_timestamp = parser.parse(timestampString).strftime(datetime_format)
    consumption = json_obj["Message"]["Consumption"]/100
    previous_record = get_previous_record()
    previous_consumption = previous_record[0]
    previous_timestamp = previous_record[1]
    seconds_between_broadcasts = (datetime.strptime(broadcast_timestamp, datetime_format) - previous_timestamp).total_seconds()
    write_to_database(broadcast_timestamp, consumption, previous_consumption, seconds_between_broadcasts, meter_broadcast)


def get_database_connection():
    config = ConfigParser()
    config.read(db_settings_file)
    user = config.get("main", "user")
    password = config.get("main", "password")
    database = config.get("main", "database")
    host = config.get("main", "host")
    mariadb_connection = mariadb.connect(user=user, password=password, database=database, host=host)
    return mariadb_connection


def get_previous_record():
    mariadb_connection = get_database_connection()
    cursor = mariadb_connection.cursor(buffered=True)
    get_prev_record_command = "SELECT TotalConsumption, Timestamp FROM EnergyLogs ORDER BY Timestamp DESC LIMIT 1"
    print(get_prev_record_command)
    cursor.execute(get_prev_record_command)
    prev_record_response = cursor.fetchone()
    if prev_record_response is None:
        mariadb_connection.close()
        return 0.0
    else:
        prev_consumption = float(prev_record_response[0])
        prev_timestamp = prev_record_response[1]
        print(f"previous consumption: {prev_consumption}")
        print(f"previous timestamp: {prev_timestamp}")
        mariadb_connection.close()
        return (prev_consumption, prev_timestamp)


def write_to_database(timestamp, consumption_kwh, prev_consumption, seconds_between_broadcasts, meter_broadcast):
    mariadb_connection = get_database_connection()
    cursor = mariadb_connection.cursor(buffered=True)
    delta = 0.0
    if prev_consumption is not None:
        delta = consumption_kwh - prev_consumption
    power = 0.0
    if prev_consumption is not None and seconds_between_broadcasts is not None:
        percent_of_hour = seconds_between_broadcasts / 3600
        power = delta / percent_of_hour
    insert_command = f"INSERT INTO EnergyLogs (Timestamp, TotalConsumption, Delta, PowerDraw, MeterBroadcast) VALUES ('{timestamp}', {consumption_kwh}, {delta}, {power}, '{meter_broadcast}')"
    print(insert_command)
    print("-----END-----")
    cursor.execute(insert_command)
    mariadb_connection.commit()
    mariadb_connection.close()


if len(sys.argv) != 3:
    print("Incorrect number of args specified")
    sys.exit(1)

meter_settings_file = sys.argv[1]
db_settings_file = sys.argv[2]

config = ConfigParser()
config.read(meter_settings_file)
meter_id = config.get("main", "meter_id")
command = f"rtlamr -filterid={meter_id} -msgtype=scm -format=json -unique"
run_command(command)
