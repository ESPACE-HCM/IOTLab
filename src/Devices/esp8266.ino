#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// const char* ssid = "ESPACE24";
// const char* password = "Innov@tion";
const char* ssid = "Family";
const char* password = "12346789";
IPAddress server(192,168,1,8);
HTTPClient http;
WiFiClient client;
uint8_t LEDs[5] = {3,4,5,6,7};
void setup()
{
    for (uint8_t i = 0; i < 5; i++)
    {
        pinMode(LEDs[i], OUTPUT);
    }
    
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    WiFi.mode(WIFI_STA);
    char a[3] = "AB";
    int c = (int) strtol(a, 0, 16);
    Serial.println(c);
    delay(10000);
    while (WiFi.status() != WL_CONNECTED) 
    {    
        delay(100);
        Serial.println("Connecting..");
    } 
    Serial.println("[Connected]");
    

}

void loop()
{
    if (client.connect(server, 2383))
    {
        GETMethod();
        delay(3000);
    }  
}

void GETMethod()
{
     Serial.println("Begin Get data");
    String address = "http://192.168.1.8:2383/led";
    http.begin(address);    
    int httpCode = http.GET();            
    String payload = http.getString(); 
    char status[6];
    payload.toCharArray(status, 6, 0);
    for (uint8_t i = 0; i < 5; i++)
    {
        if (status[i] == '1')
        {
            digitalWrite(LEDs[i], HIGH);
        }
        else if(status[i] == '0')
        {
            digitalWrite(LEDs[i], LOW);
        }
    }
}

void POSTMethod(String path)
{
    Serial.println("[Sending a request]");
    client.print(String("POST /" + path) + " HTTP/1.1\r\n" +
                "Host: 192.168.1.8:2383/" + "\r\n" +
                "Connection: close\r\n" +
                "Content-Type: application/x-www-form-urlencoded\r\n" +
                "Content-Length: 11\r\n" + 
                "\r\n" + 
                "x=123&y=456"); 
    Serial.println("[Response:]");
    while (client.connected() || client.available())
    {
        if (client.available())
        {
            String line = client.readStringUntil('\n');
            Serial.print(line);
        }
    }
    client.stop();
}