import urllib.request
import xml.etree.ElementTree as ET
import json

# L'ID de votre chaîne ANDROS XOcontroller
CHANNEL_ID = "UC4r-r4bzp-fQp2G0fia5LZQ"
RSS_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"

try:
    # Récupération des données YouTube
    req = urllib.request.Request(RSS_URL, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    xml_data = response.read()
    root = ET.fromstring(xml_data)

    # Espaces de noms utilisés par YouTube
    ns = {'ns': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015', 'media': 'http://search.yahoo.com/mrss/'}

    videos = []
    
    # Lecture des 15 dernières vidéos
    for entry in root.findall('ns:entry', ns):
        video_id = entry.find('yt:videoId', ns).text
        title = entry.find('ns:title', ns).text
        date = entry.find('ns:published', ns).text.split('T')[0] # Garde juste AAAA-MM-JJ
        
        media_group = entry.find('media:group', ns)
        description = media_group.find('media:description', ns).text or ""
        thumbnail = media_group.find('media:thumbnail', ns).attrib['url']
        
        # Raccourcir la description à 150 caractères
        if len(description) > 150:
            description = description[:150] + "..."

        videos.append({
            "id": video_id,
            "title": title,
            "date": date,
            "thumbnail": thumbnail,
            "description": description,
            "videoUrl": f"https://www.youtube.com/watch?v={video_id}"
        })

    # Sauvegarde dans le fichier JSON pour le site
    with open('videos.json', 'w', encoding='utf-8') as f:
        json.dump(videos, f, ensure_ascii=False, indent=2)
        
    print(f"Succès : {len(videos)} vidéos récupérées.")

except Exception as e:
    print(f"Erreur : {e}")
