$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "https://m.facebook.com/events/calendar/birthdays"

Start-Process $chromePath --args $url "--auto-open-devtools-for-tabs"