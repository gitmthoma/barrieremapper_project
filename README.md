# BarriereMapper
BarriereMapper ist eine dockerbasierte Webanwendung, die darauf abzielt, städtische Barrieren auf einer Karte zu markieren und karten- und listenbasiert anzeigen zu lassen. Weitere Informationen zum Kontext der Anwendung finden Sie via [BarriereMapper-Website](https://barrieremapper-website-mthoma-93714e67e93ba3dd4ff63482e1d96b185.pages.gitlab.rlp.net). Um zur Anwendung selbst zu gelangen, folgen Sie diesem Link: [BarriereMapper](https://pfaffnground.ddns.net). Zur API, über die eingetragene Barrieren im NGSI-LD-Format abgefragt werden können, gelangen Sie unter: [BarriereMapper-API](https://pfaffnground.ddns.net/controller_api/docs).

Die Anwendung besteht aus drei Hauptkomponenten, die gemäß dem MVC-Muster jeweils in einem eigenen Verzeichnis organisiert sind: *barrieremapper_view*, *barrieremapper_controller* und *barrieremapper_model*.

### Struktur
**barrieremapper_view**: Dieses Verzeichnis enthält die Frontend-Komponenten der Anwendung. Es beinhaltet die Benutzeroberfläche und die Logik zur Interaktion mit dem Benutzer.

**barrieremapper_controller**: Dieses Verzeichnis enthält die Backend-Logik der Anwendung. Es handhabt die Kommunikation zwischen dem Modell und der Ansicht.

**barrieremapper_model**: Dieses Verzeichnis enthält die Datenmodelle und die Datenbankinteraktionen der Anwendung.

### Docker
Die Anwendung ist dockerisiert und kann daher leicht auf jedem System via Docker installiert und ausgeführt werden. Um die Anwendung zu starten, navigieren Sie in die Verzeichnisse, in denen sich die **docker-compose.yml**-Dateien befinden, und führen Sie über die Kommandozeile den folgenden Befehl aus:

`docker-compose up -d`

Beachten Sie für ein lokales Deployment die Anpassung der in den env-Variablen eingetragenen Adressen zur Kommunikation der Container untereinander. (Normalerweise kommunizieren die Services über ihre öffentlich erreichbaren Internet-Addressen, um die Kommunikation über https zu verschlüsseln. Dies ist beim lokalen Deployment nicht möglich. Aus diesem Grund kann die Kommunikation nur über http erfolgen, weshalb es zu Einschränkungen seitens des genutzten Browsers kommen kann.)

## Verwendete Frameworks und Dienste

Diese Anwendung nutzt verschiedene Frameworks und Dienste, um die Funktionalität zu implementieren und einen reibungslosen Betrieb sicherzustellen. Hier sind die Komponenten, die in diesem Projekt verwendet werden:

### Frameworks:

1. [**PureCSS**](https://github.com/pure-css)
   - Lizenz: BSD License, © 2013 Yahoo! Inc.

3. [**Leaflet**](https://github.com/Leaflet)
   - Lizenz: BSD 2-Clause License  
            © 2010-2024, Volodymyr Agafonkin  
            © 2010-2011, CloudMade  
            All rights reserved.

5. [**FastAPI**](https://github.com/tiangolo/fastapi/)
   - Lizenz: The MIT License (MIT)  
            © 2018 Sebastián Ramírez

7. [**Express**](https://github.com/expressjs/express) 
   - Lizenz: The MIT License (MIT)  
            © 2009-2014 TJ Holowaychuk <tj@vision-media.ca>  
            © 2013-2014 Roman Shtylman <shtylman+expressjs@gmail.com>  
            © 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com>  

### Dienste:

5. **Scorpio Context Broker** 
   - Website: [Link zur Scorpio Context Broker Website](https://github.com/ScorpioBroker/)
   - Lizenz: BSD 3-Clause License  
            © 2021, NEC  
            All rights reserved.

Bitte beachten Sie die Lizenzbedingungen jedes Frameworks und Dienstes für weitere Informationen zur Verwendung und Distribution.


### Lizenz
Diese Software ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der LIZENZ-Datei.
