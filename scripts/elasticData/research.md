# basic
```json
{
  "mappings": {
    "properties": {
      "title":  { "type": "text"  },
      "ingredients": {"type":  "text", "boost": 2 },
      "instruction": {"type":  "text"},
      "total_time":    { "type": "integer" },
      "cook_time":    { "type": "integer", "index": false },
      "prep_time":    { "type": "integer", "index": false }
    }
  }
}
```

POST /lol/_doc
```json
{
  "title": "title 2 with additional data",
  "test": "test 2",
  "total_time": 2,
  "dummy": "dummy string"
}
```

# Search as you type

```json
PUT /lol
{
  "mappings": {
    "properties": {
      "title":  {
        "type": "text",
        "fields" : {
            "keyword" : {
              "type" : "search_as_you_type"
            }  
          }
      },
      "test": {
        "type":  "text"
      }
    }
  }
}
POST /lol/_bulk
{"index":{}}
{ "title": "potato a la butter", "test": ["salt", "pepper", "carrot"] }
{"index":{}}
{ "title": "potato gratin", "test": ["salt", "pepper", "carrot"] }
{"index":{}}
{ "title": "ground beef", "test": ["salt", "pepper", "carrot"] }
{"index":{}}
{ "title": "beef tartare", "test": ["banana", "car", "salted"] }
{"index":{}}
{ "title": "beef strogonov", "test": ["pepper and salt", "car"] }
{"index":{}}
{"title": "spinash dip", "test": ["oil and salt", "car"]}
{"index":{}}
{"title": "tomato humus", "test": ["vinegar and oil", "garlic"]  }
{"index":{}}
{"title": "humus without garlic", "test": ["oil and lemon", "yogurt"]}
{"index":{}}
{"title": "potatoes in garlic sauce", "test": ["potattoes", "oil and lemon", "yogurt"]}
```
```json
GET /lol/_search

GET /lol/_search
{
  "query": {
    "multi_match": {
      "query": "oi",
      "type": "bool_prefix",
      "fields": [
        "test",
        "test._2gram",
        "test._3gram"
      ]
    }
  }
}
GET /lol/_search
{
  "query": {
    "match": {
      "test": "salt"
    }
  }
}
```