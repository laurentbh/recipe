// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0
// 	protoc        v3.14.0
// source: parsing.proto

package parsing

import (
	proto "github.com/golang/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type ParsingRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Input string `protobuf:"bytes,1,opt,name=input,proto3" json:"input,omitempty"`
}

func (x *ParsingRequest) Reset() {
	*x = ParsingRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_parsing_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ParsingRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ParsingRequest) ProtoMessage() {}

func (x *ParsingRequest) ProtoReflect() protoreflect.Message {
	mi := &file_parsing_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ParsingRequest.ProtoReflect.Descriptor instead.
func (*ParsingRequest) Descriptor() ([]byte, []int) {
	return file_parsing_proto_rawDescGZIP(), []int{0}
}

func (x *ParsingRequest) GetInput() string {
	if x != nil {
		return x.Input
	}
	return ""
}

type ParsingResult struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Word       string `protobuf:"bytes,1,opt,name=word,proto3" json:"word,omitempty"`
	Position   int32  `protobuf:"varint,2,opt,name=position,proto3" json:"position,omitempty"`
	Index      int32  `protobuf:"varint,3,opt,name=index,proto3" json:"index,omitempty"`
	Identified bool   `protobuf:"varint,4,opt,name=identified,proto3" json:"identified,omitempty"`
	Entity     string `protobuf:"bytes,5,opt,name=entity,proto3" json:"entity,omitempty"`
	Id         int64  `protobuf:"varint,6,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *ParsingResult) Reset() {
	*x = ParsingResult{}
	if protoimpl.UnsafeEnabled {
		mi := &file_parsing_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ParsingResult) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ParsingResult) ProtoMessage() {}

func (x *ParsingResult) ProtoReflect() protoreflect.Message {
	mi := &file_parsing_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ParsingResult.ProtoReflect.Descriptor instead.
func (*ParsingResult) Descriptor() ([]byte, []int) {
	return file_parsing_proto_rawDescGZIP(), []int{1}
}

func (x *ParsingResult) GetWord() string {
	if x != nil {
		return x.Word
	}
	return ""
}

func (x *ParsingResult) GetPosition() int32 {
	if x != nil {
		return x.Position
	}
	return 0
}

func (x *ParsingResult) GetIndex() int32 {
	if x != nil {
		return x.Index
	}
	return 0
}

func (x *ParsingResult) GetIdentified() bool {
	if x != nil {
		return x.Identified
	}
	return false
}

func (x *ParsingResult) GetEntity() string {
	if x != nil {
		return x.Entity
	}
	return ""
}

func (x *ParsingResult) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

type ParsingResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Results []*ParsingResult `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
}

func (x *ParsingResponse) Reset() {
	*x = ParsingResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_parsing_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ParsingResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ParsingResponse) ProtoMessage() {}

func (x *ParsingResponse) ProtoReflect() protoreflect.Message {
	mi := &file_parsing_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ParsingResponse.ProtoReflect.Descriptor instead.
func (*ParsingResponse) Descriptor() ([]byte, []int) {
	return file_parsing_proto_rawDescGZIP(), []int{2}
}

func (x *ParsingResponse) GetResults() []*ParsingResult {
	if x != nil {
		return x.Results
	}
	return nil
}

var File_parsing_proto protoreflect.FileDescriptor

var file_parsing_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12,
	0x07, 0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x22, 0x26, 0x0a, 0x0e, 0x50, 0x61, 0x72, 0x73,
	0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x6e,
	0x70, 0x75, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x69, 0x6e, 0x70, 0x75, 0x74,
	0x22, 0x9d, 0x01, 0x0a, 0x0d, 0x50, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x73, 0x75,
	0x6c, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x77, 0x6f, 0x72, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x04, 0x77, 0x6f, 0x72, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69,
	0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69,
	0x6f, 0x6e, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x6e, 0x64, 0x65, 0x78, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x05, 0x69, 0x6e, 0x64, 0x65, 0x78, 0x12, 0x1e, 0x0a, 0x0a, 0x69, 0x64, 0x65, 0x6e,
	0x74, 0x69, 0x66, 0x69, 0x65, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x52, 0x0a, 0x69, 0x64,
	0x65, 0x6e, 0x74, 0x69, 0x66, 0x69, 0x65, 0x64, 0x12, 0x16, 0x0a, 0x06, 0x65, 0x6e, 0x74, 0x69,
	0x74, 0x79, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79,
	0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x06, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64,
	0x22, 0x43, 0x0a, 0x0f, 0x50, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x30, 0x0a, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x18, 0x01,
	0x20, 0x03, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x2e, 0x50,
	0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x52, 0x07, 0x72, 0x65,
	0x73, 0x75, 0x6c, 0x74, 0x73, 0x32, 0x86, 0x01, 0x0a, 0x06, 0x50, 0x61, 0x72, 0x73, 0x65, 0x72,
	0x12, 0x3a, 0x0a, 0x05, 0x50, 0x61, 0x72, 0x73, 0x65, 0x12, 0x17, 0x2e, 0x70, 0x61, 0x72, 0x73,
	0x69, 0x6e, 0x67, 0x2e, 0x50, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x18, 0x2e, 0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x2e, 0x50, 0x61, 0x72,
	0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x40, 0x0a, 0x0b,
	0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x50, 0x61, 0x72, 0x73, 0x65, 0x12, 0x17, 0x2e, 0x70, 0x61,
	0x72, 0x73, 0x69, 0x6e, 0x67, 0x2e, 0x50, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x2e, 0x50,
	0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x30, 0x01, 0x42, 0x27,
	0x5a, 0x25, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6c, 0x61, 0x75,
	0x72, 0x65, 0x6e, 0x74, 0x62, 0x68, 0x2f, 0x72, 0x65, 0x63, 0x69, 0x70, 0x65, 0x42, 0x45, 0x2f,
	0x70, 0x61, 0x72, 0x73, 0x69, 0x6e, 0x67, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_parsing_proto_rawDescOnce sync.Once
	file_parsing_proto_rawDescData = file_parsing_proto_rawDesc
)

func file_parsing_proto_rawDescGZIP() []byte {
	file_parsing_proto_rawDescOnce.Do(func() {
		file_parsing_proto_rawDescData = protoimpl.X.CompressGZIP(file_parsing_proto_rawDescData)
	})
	return file_parsing_proto_rawDescData
}

var file_parsing_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_parsing_proto_goTypes = []interface{}{
	(*ParsingRequest)(nil),  // 0: parsing.ParsingRequest
	(*ParsingResult)(nil),   // 1: parsing.ParsingResult
	(*ParsingResponse)(nil), // 2: parsing.ParsingResponse
}
var file_parsing_proto_depIdxs = []int32{
	1, // 0: parsing.ParsingResponse.results:type_name -> parsing.ParsingResult
	0, // 1: parsing.Parser.Parse:input_type -> parsing.ParsingRequest
	0, // 2: parsing.Parser.StreamParse:input_type -> parsing.ParsingRequest
	2, // 3: parsing.Parser.Parse:output_type -> parsing.ParsingResponse
	1, // 4: parsing.Parser.StreamParse:output_type -> parsing.ParsingResult
	3, // [3:5] is the sub-list for method output_type
	1, // [1:3] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_parsing_proto_init() }
func file_parsing_proto_init() {
	if File_parsing_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_parsing_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ParsingRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_parsing_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ParsingResult); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_parsing_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ParsingResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_parsing_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_parsing_proto_goTypes,
		DependencyIndexes: file_parsing_proto_depIdxs,
		MessageInfos:      file_parsing_proto_msgTypes,
	}.Build()
	File_parsing_proto = out.File
	file_parsing_proto_rawDesc = nil
	file_parsing_proto_goTypes = nil
	file_parsing_proto_depIdxs = nil
}
