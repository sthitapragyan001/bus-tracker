import paho.mqtt.client as mqtt
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import pandas as pd
import os
import time

# MQTT settings
mqtt_server = "test.mosquitto.org"
mqtt_port = 1883
mqtt_topic = "ppg_mad_sensor/data101"

# Initialize data deque for plotting
max_length = 500
time_data = deque(maxlen=max_length)
ir_data = deque(maxlen=max_length)
red_data = deque(maxlen=max_length)

# CSV file setup
csv_file = 'ppg_data.csv'
if not os.path.exists(csv_file):
    with open(csv_file, 'w') as file:
        file.write('timestamp,ir,red\n')

# MQTT callbacks
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        client.subscribe(mqtt_topic)
    else:
        print("Connection failed with code", rc)

def on_message(client, userdata, msg):
    data = msg.payload.decode()
    data_rows = data.split(';')
    print('hi')
    print(data_rows)
    for row in data_rows:
        if row:  # Avoid empty strings
            timestamp, ir, red = row.split(',')
            print(f"Received data: timestamp={timestamp}, ir={ir}, red={red}")  # Print the arriving data

            time_data.append(int(timestamp))
            ir_data.append(int(ir))
            red_data.append(int(red))

            # Save the data to the CSV file
            with open(csv_file, 'a') as file:
                file.write(f"{timestamp},{ir},{red}\n")

# Define the figure and axis for plotting
fig, ax = plt.subplots(2, 1, figsize=(10, 8))
ir_line, = ax[0].plot([], [], label='IR Data', color='blue')
red_line, = ax[1].plot([], [], label='Red Data', color='red')

def init():
    ax[0].set_title('IR Data')
    ax[0].set_xlabel('Time (ms)')
    ax[0].set_ylabel('IR Value')
    ax[0].grid(True)
    ax[0].legend(loc='upper right')

    ax[1].set_title('Red Data')
    ax[1].set_xlabel('Time (ms)')
    ax[1].set_ylabel('Red Value')
    ax[1].grid(True)
    ax[1].legend(loc='upper right')
    
    return ir_line, red_line

def update(frame):
    if len(time_data) > 0:
        ir_line.set_data(time_data, ir_data)
        red_line.set_data(time_data, red_data)

        ax[0].relim()
        ax[0].autoscale_view()
        ax[1].relim()
        ax[1].autoscale_view()

    return ir_line, red_line

# MQTT client setup
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(mqtt_server, mqtt_port, 60)
except Exception as e:
    print(f"Failed to connect to MQTT broker: {e}")
    exit(1)

client.loop_start()

# Create an animation that calls the update function every 100ms
ani = FuncAnimation(fig, update, init_func=init, interval=5, blit=True)

# Show the plot
plt.tight_layout()
plt.show()