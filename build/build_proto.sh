protoc -I ../api/proto --go_out=../internal/grpc/parsing  --go_opt=paths=source_relative  --go-grpc_out=../internal/grpc/parsing  --go-grpc_opt=paths=source_relative \
 parsing.proto


# javascript files
protoc -I ../api/proto \
--js_out=import_style=commonjs,binary:. \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:. \
parsing.proto

mv parsing_grpc_web_pb.js parsing_pb.js ../front-end/src/services/.