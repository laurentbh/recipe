# recipe


## gRPC
### for js
brewed protoc-gen-grpc-web
### dependencies
`
npm install grpc-web --save
npm install google-protobuf --save
`    
**problem** with generated files [see](https://github.com/grpc/grpc-web/issues/447)
must add in `parsing_pb.js`
```
/* eslint-disable */
// @ts-nocheck
``` 
**TODO**: do I need `"@grpc/proto-loader"` ?


### envoy
#### config
envoy admin port:
```
admin:
      access_log_path: /tmp/admin_access.log
      address:
        socket_address: { address: 0.0.0.0, port_value: 9901 }
```
listening port:
```
listeners:
      - name: listener_0
        address:
          socket_address: { address: 0.0.0.0, port_value: 9090 }
```


```
docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    -p 9090:9090 -p 50051:50052 envoyproxy/envoy:v1.15.0
```    

docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
-p 9090:9090 -p 9901:9901 envoyproxy/envoy:v1.15.0

## Neo4j
### docker
```
docker run  -p 7474:7474 -p 7687:7687 neo4j:4.1.2
```

## docker volume
create volumes for `neo4j`, `elasticsearch` and `images`
```
docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/laurent/RecipeData/neo4j \
    --opt o=bind recipe_neo4j

docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/laurent/RecipeData/elastic \
    --opt o=bind recipe_elastic

docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/laurent/RecipeData/images \
    --opt o=bind recipe_images
```

### for docker compose
not needed!!!
- create headless user
  as root `sysadminctl -addUser neo4j -home /var/empty`


## node
`docker build . -t recipe-web-app`


# TODO
`Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them`

docker build . -t recipe
docker run -p 8080:8080 recipe
