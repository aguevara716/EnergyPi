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
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            parse_output(output.strip())
    rc = process.poll()
    return rc


def parse_output(line):
    print("Parsing output")
    json_obj = json.loads(line)
    timestampString = json_obj["Time"]
    timestamp = parser.parse(timestampString).strftime("%Y-%m-%d %H:%M:%S")
    consumption = json_obj["Message"]["Consumption"]/100
    previous_consumption = get_previous_consumption()
    write_to_database(timestamp, consumption, previous_consumption)


def get_database_connection():
    config = ConfigParser()
    config.read(db_settings_file)
    user = config.get("main", "user")
    password = config.get("main", "password")
    database = config.get("main", "database")
    host = config.get("main", "host")
    mariadb_connection = mariadb.connect(user=user, password=password, database=database, host=host)
    return mariadb_connection


def get_previous_consumption():
    mariadb_connection = get_database_connection()
    cursor = mariadb_connection.cursor(buffered=True)
    get_prev_consumption_command = "SELECT TotalConsumption FROM EnergyLogs ORDER BY Timestamp DESC LIMIT 1"
    print(get_prev_consumption_command)
    cursor.execute(get_prev_consumption_command)
    prev_consumption_response = cursor.fetchone()
    if prev_consumption_response is None:
        mariadb_connection.close()
        return 0.0
    else:
        prev_consumption = float(prev_consumption_response[0])
        print(f"previous consumption: {prev_consumption}")
        mariadb_connection.close()
        return prev_consumption


def write_to_database(timestamp, consumption_kwh, prev_consumption):
    mariadb_connection = get_database_connection()
    cursor = mariadb_connection.cursor(buffered=True)
    delta = 0.0
    if prev_consumption is not None:
        delta = consumption_kwh - prev_consumption
    insert_command = f"INSERT INTO EnergyLogs (Timestamp, TotalConsumption, Delta) VALUES ('{timestamp}', {consumption_kwh}, {delta})"
    print(insert_command)
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
