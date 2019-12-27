#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "ESPACE24";
const char* password = "Innov@tion";
HTTPClient http;

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) 
    {    
        delay(100);
        Serial.println("Connecting..");
    } 
}

void loop()
{
    GETMethod();
    delay(1000);
    POSTMethod();
    delay(1000);
}

void GETMethod()
{
    Serial.print("METHOD GET:");
    http.begin("http://192.168.1.102:2383/");
    int httpCode = http.GET();
    Serial.print("Get status:");
    Serial.println(httpCode);
    if (httpCode > 0) { 
        Serial.print("Get Data:");
        String payload = http.getString();   
        Serial.println(payload); 
    }    
    http.end();
}

void POSTMethod()
{
    Serial.print("METHOD POST:");
    http.begin("http://192.168.1.102:2383/");
    http.addHeader("Content-Type", "text/plain");
    int httpCode = http.POST("{\"x\":198,\"y\":345}");    
    Serial.print("Get status:");
    Serial.println(httpCode);    
    if(httpCode > 0)
    {
        String response = http.getString();
        Serial.println(response);          
    }  
    http.end();
}