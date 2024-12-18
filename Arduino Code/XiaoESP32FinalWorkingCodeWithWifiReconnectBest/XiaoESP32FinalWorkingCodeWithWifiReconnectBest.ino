#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
static const int RXPin = D7, TXPin = D6;
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;
SoftwareSerial ss(RXPin, TXPin);

#include "config.h"  // Configuration for Adafruit IO

int value = 0;
double lat = 28.545684;
double lon = 77.185579;
double ele = 0;
double vel = 0;
#define IO_LOOP_DELAY 2000
unsigned long lastUpdate;

AdafruitIO_Feed *latitudeFeed = io.feed("latitude");

void setup() {
  Serial.begin(115200);
  ss.begin(GPSBaud);

  Serial.print("Connecting to Adafruit IO");
  io.connect();

  // latitudeFeed->onMessage(handleMessage);

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.println(io.statusText());
  latitudeFeed->get();
}

void loop() {

  // Check if the Adafruit IO connection is lost and reconnect
  if(io.status() != AIO_CONNECTED) {
    Serial.println("Connection lost, attempting to reconnect...");
    io.connect();

    // Wait for reconnection
    while(io.status() < AIO_CONNECTED) {
      Serial.print(".");
      delay(500);
    }
    
    Serial.println();
    Serial.println("Reconnected to Adafruit IO");
  }

  // Read GPS data
  while (ss.available() > 0) {
    gps.encode(ss.read());
  }

  /*if (gps.location.isUpdated()) {
    Serial.print("LAT="); Serial.print(gps.location.lat(), 6);
    Serial.print("LNG="); Serial.println(gps.location.lng(), 6);
  }*/

  // Keep Adafruit IO connection alive
  io.run();
  //printFloat(gps.speed.kmph(), gps.speed.isValid(), 6, 2);

  if (millis() > (lastUpdate + IO_LOOP_DELAY)) {
    Serial.print(value);
    Serial.print(",");
    Serial.print(lat, 6);
    Serial.print(",");
    Serial.print(lon, 6);
    Serial.print(",");
    Serial.println(vel, 2);
    //printFloat(gps.speed.kmph(), gps.speed.isValid(), 6, 2);

    latitudeFeed->save(value, lat, lon, vel);

    value += 1;
    lat = gps.location.lat();
    lon = gps.location.lng();
    ele += 1;
    vel = gps.speed.kmph();

    lastUpdate = millis();
  }
}
static void printFloat(float val, bool valid, int len, int prec)
{
  if (!valid)
  {
    while (len-- > 1)
      Serial.print('*');
    Serial.print(' ');
  }
  else
  {
    Serial.print(val, prec);
    int vi = abs((int)val);
    int flen = prec + (val < 0.0 ? 2 : 1); // . and -
    flen += vi >= 1000 ? 4 : vi >= 100 ? 3 : vi >= 10 ? 2 : 1;
    for (int i=flen; i<len; ++i)
      Serial.print(' ');
  }
  smartDelay(0);
}
/*void handleMessage(AdafruitIO_Data *data) {
  int received_value = data->toInt();
  double received_lat = data->lat();
  double received_lon = data->lon();
  double received_ele = data->ele();*/

  //Serial.println("Received data from Adafruit IO");
  static void smartDelay(unsigned long ms)
{
  unsigned long start = millis();
  do 
  {
    while (ss.available())
      gps.encode(ss.read());
  } while (millis() - start < ms);
}

