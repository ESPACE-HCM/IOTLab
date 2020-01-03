#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// const char* ssid = "ESPACE24";
// const char* password = "Innov@tion";
const char* ssid = "Family";
const char* password = "12346789";
IPAddress server(192,168,1,8);
HTTPClient http;
WiFiClient client;
void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    WiFi.mode(WIFI_STA);
    while (WiFi.status() != WL_CONNECTED) 
    {    
        delay(100);
        Serial.println("Connecting..");
    } 
    Serial.println("[Connected]");
}

void loop()
{
    //GETMethod();
    if (client.connect(server, 2383))
    {
        // GETMethod();
        // delay(1000);
        POSTMethod("add");
        delay(1000);
    }
    Serial.println("\n[Cannot connect retry]");
    delay(1000);
}

void GETMethod()
{
    Serial.println("[Sending a request]");
    client.print(String("GET /") + " HTTP/1.1\r\n" +
                "Host: 192.168.1.8:2383/\r\n" +
                "Connection: close\r\n" +
                "\r\n"
                );
    Serial.println("[Response:]");
    while (client.connected() || client.available())
    {
        if (client.available())
        {
            String line = client.readStringUntil('\n');
            Serial.println(line);
        }
    }
    client.stop();
    Serial.print("\n[Disconnected]");
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