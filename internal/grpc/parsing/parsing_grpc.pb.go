// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package parsing

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion7

// ParserClient is the client API for Parser service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ParserClient interface {
	Parse(ctx context.Context, in *ParsingRequest, opts ...grpc.CallOption) (*ParsingResponse, error)
	StreamParse(ctx context.Context, in *ParsingRequest, opts ...grpc.CallOption) (Parser_StreamParseClient, error)
}

type parserClient struct {
	cc grpc.ClientConnInterface
}

func NewParserClient(cc grpc.ClientConnInterface) ParserClient {
	return &parserClient{cc}
}

func (c *parserClient) Parse(ctx context.Context, in *ParsingRequest, opts ...grpc.CallOption) (*ParsingResponse, error) {
	out := new(ParsingResponse)
	err := c.cc.Invoke(ctx, "/parsing.Parser/Parse", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *parserClient) StreamParse(ctx context.Context, in *ParsingRequest, opts ...grpc.CallOption) (Parser_StreamParseClient, error) {
	stream, err := c.cc.NewStream(ctx, &_Parser_serviceDesc.Streams[0], "/parsing.Parser/StreamParse", opts...)
	if err != nil {
		return nil, err
	}
	x := &parserStreamParseClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Parser_StreamParseClient interface {
	Recv() (*ParsingResult, error)
	grpc.ClientStream
}

type parserStreamParseClient struct {
	grpc.ClientStream
}

func (x *parserStreamParseClient) Recv() (*ParsingResult, error) {
	m := new(ParsingResult)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// ParserServer is the server API for Parser service.
// All implementations must embed UnimplementedParserServer
// for forward compatibility
type ParserServer interface {
	Parse(context.Context, *ParsingRequest) (*ParsingResponse, error)
	StreamParse(*ParsingRequest, Parser_StreamParseServer) error
	mustEmbedUnimplementedParserServer()
}

// UnimplementedParserServer must be embedded to have forward compatible implementations.
type UnimplementedParserServer struct {
}

func (UnimplementedParserServer) Parse(context.Context, *ParsingRequest) (*ParsingResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Parse not implemented")
}
func (UnimplementedParserServer) StreamParse(*ParsingRequest, Parser_StreamParseServer) error {
	return status.Errorf(codes.Unimplemented, "method StreamParse not implemented")
}
func (UnimplementedParserServer) mustEmbedUnimplementedParserServer() {}

// UnsafeParserServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ParserServer will
// result in compilation errors.
type UnsafeParserServer interface {
	mustEmbedUnimplementedParserServer()
}

func RegisterParserServer(s grpc.ServiceRegistrar, srv ParserServer) {
	s.RegisterService(&_Parser_serviceDesc, srv)
}

func _Parser_Parse_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ParsingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ParserServer).Parse(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/parsing.Parser/Parse",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ParserServer).Parse(ctx, req.(*ParsingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Parser_StreamParse_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(ParsingRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(ParserServer).StreamParse(m, &parserStreamParseServer{stream})
}

type Parser_StreamParseServer interface {
	Send(*ParsingResult) error
	grpc.ServerStream
}

type parserStreamParseServer struct {
	grpc.ServerStream
}

func (x *parserStreamParseServer) Send(m *ParsingResult) error {
	return x.ServerStream.SendMsg(m)
}

var _Parser_serviceDesc = grpc.ServiceDesc{
	ServiceName: "parsing.Parser",
	HandlerType: (*ParserServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Parse",
			Handler:    _Parser_Parse_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "StreamParse",
			Handler:       _Parser_StreamParse_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "parsing.proto",
}
