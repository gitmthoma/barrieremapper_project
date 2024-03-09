# Barrieremapper
Barrieremapper ist eine dockerbasierte Webanwendung, die darauf abzielt, städtische Barrieren auf einer Karte zu markieren und karten- und listenbasiert anzeigen zu lassen. Weitere Informationen zum Kontext der Anwendung finden Sie unter [BarriereMapper-Projekt](https://barrieremapper-project-mthoma-3bc62844e10abc09893286bb94ec3b485.pages.gitlab.rlp.net/). Um zur Anwendung selbst zu gelangen, folgen Sie diesem Link: [BarriereMapper](https://pfaffnground.ddns.net). Zur API, über die eingetragene Barrieren im NGSI-LD-Format abgefragt werden können, gelangen Sie unter: [BarriereMapper-API](https://pfaffnground.ddns.net/controller_api/docs).

Die Anwendung besteht aus drei Hauptkomponenten, die gemäß dem MVC-Muster jeweils in einem eigenen Verzeichnis organisiert sind: *barrieremapper_view*, *barrieremapper_controller* und *barrieremapper_model*.

### Struktur
**barrieremapper_view**: Dieses Verzeichnis enthält die Frontend-Komponenten der Anwendung. Es beinhaltet die Benutzeroberfläche und die Logik zur Interaktion mit dem Benutzer.

**barrieremapper_controller**: Dieses Verzeichnis enthält die Backend-Logik der Anwendung. Es handhabt die Kommunikation zwischen dem Modell und der Ansicht.

**barrieremapper_model**: Dieses Verzeichnis enthält die Datenmodelle und die Datenbankinteraktionen der Anwendung.

### Docker
Die Anwendung ist dockerisiert und kann daher leicht auf jedem System via Docker installiert und ausgeführt werden. Um die Anwendung zu starten, navigieren Sie in die Verzeichnisse, in denen sich die **docker-compose.yml**-Dateien befinden, und führen Sie über die Kommandozeile den folgenden Befehl aus:

`docker-compose up -d`

## Verwendete Frameworks und Dienste

Diese Anwendung nutzt verschiedene Frameworks und Dienste, um die Funktionalität zu implementieren und einen reibungslosen Betrieb sicherzustellen. Hier sind die Komponenten, die in diesem Projekt verwendet werden:

### Frameworks:

- [**PureCSS:**](https://github.com/pure-css) Eine Reihe von CSS-Modulen, die für das Erstellen von ansprechenden, reaktionsschnellen Webseiten verwendet werden können.
  - Lizenz: BSD License, © 2013 Yahoo! Inc.

- [**Leaflet:**](https://github.com/Leaflet) Ein Open-Source-JavaScript-Bibliothek zur Erstellung interaktiver Karten.
  - Lizenz: BSD 2-Clause License
            © 2010-2024, Volodymyr Agafonkin
            © 2010-2011, CloudMade
            All rights reserved.

- [**FastAPI:**](https://github.com/tiangolo/fastapi/) Ein schnelles (High-performance), modernes Web-Framework für Python.
  - Lizenz: The MIT License (MIT)
            © 2018 Sebastián Ramírez

- [**Express:**](https://github.com/expressjs/express) Ein beliebtes Webanwendungs-Framework für Node.js.
  - Lizenz: The MIT License (MIT)
            © 2009-2014 TJ Holowaychuk <tj@vision-media.ca>
            © 2013-2014 Roman Shtylman <shtylman+expressjs@gmail.com>
            © 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com>

### Dienste:

- **Scorpio Context Broker:** Ein Kontextbroker, der im Backend verwendet wird, um Daten zu verarbeiten und das Model des MVC zu unterstützen.
  - Website: [Link zur Scorpio Context Broker Website](https://github.com/ScorpioBroker/)
  - Lizenz: BSD 3-Clause License
            © 2021, NEC
            All rights reserved.

Bitte beachten Sie die Lizenzbedingungen jedes Frameworks und Dienstes für weitere Informationen zur Verwendung und Verteilung.


### Lizenz
Diese Software ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der LIZENZ-Datei.