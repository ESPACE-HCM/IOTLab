# IOTLab
An IOT lab example for E-Space work space

## Server

Build with Nodejs

### Function

* Quản lý user
* Quản lý của các devices tương ứng của device
* Nhận trạng thái của các Device 
* Nhận trạng thái request từ Client
* Trả về trạng thái cho device và client

## Device

Arduino library for ESP8266, Node mcu, ESP32

### Function

* Thư viện quản lý kết nối và xử lý trạng thái từ server
* Nhận trạng thái được request từ server để iều khiển thiết bị theo yêu cầu
* Cập nhật trạng thái lên server

## Client

Mobile App, Desktop, Website for demo. 

### Fucntion

* Nhận trạng thái của device từ server để cập nhật giao diện
* Request thay đổi trạng thái device lên server.

