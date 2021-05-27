/**
 * @fileoverview gRPC-Web generated client stub for parsing
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


// @ts-ignore
const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.parsing = require('./parsing_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.parsing.ParserClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.parsing.ParserPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.parsing.ParsingRequest,
 *   !proto.parsing.ParsingResponse>}
 */
const methodDescriptor_Parser_Parse = new grpc.web.MethodDescriptor(
  '/parsing.Parser/Parse',
  grpc.web.MethodType.UNARY,
  proto.parsing.ParsingRequest,
  proto.parsing.ParsingResponse,
  /**
   * @param {!proto.parsing.ParsingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.parsing.ParsingResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.parsing.ParsingRequest,
 *   !proto.parsing.ParsingResponse>}
 */
const methodInfo_Parser_Parse = new grpc.web.AbstractClientBase.MethodInfo(
  proto.parsing.ParsingResponse,
  /**
   * @param {!proto.parsing.ParsingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.parsing.ParsingResponse.deserializeBinary
);


/**
 * @param {!proto.parsing.ParsingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.parsing.ParsingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.parsing.ParsingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.parsing.ParserClient.prototype.parse =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/parsing.Parser/Parse',
      request,
      metadata || {},
      methodDescriptor_Parser_Parse,
      callback);
};


/**
 * @param {!proto.parsing.ParsingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.parsing.ParsingResponse>}
 *     Promise that resolves to the response
 */
proto.parsing.ParserPromiseClient.prototype.parse =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/parsing.Parser/Parse',
      request,
      metadata || {},
      methodDescriptor_Parser_Parse);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.parsing.ParsingRequest,
 *   !proto.parsing.ParsingResult>}
 */
const methodDescriptor_Parser_StreamParse = new grpc.web.MethodDescriptor(
  '/parsing.Parser/StreamParse',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.parsing.ParsingRequest,
  proto.parsing.ParsingResult,
  /**
   * @param {!proto.parsing.ParsingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.parsing.ParsingResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.parsing.ParsingRequest,
 *   !proto.parsing.ParsingResult>}
 */
const methodInfo_Parser_StreamParse = new grpc.web.AbstractClientBase.MethodInfo(
  proto.parsing.ParsingResult,
  /**
   * @param {!proto.parsing.ParsingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.parsing.ParsingResult.deserializeBinary
);


/**
 * @param {!proto.parsing.ParsingRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.parsing.ParsingResult>}
 *     The XHR Node Readable Stream
 */
proto.parsing.ParserClient.prototype.streamParse =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/parsing.Parser/StreamParse',
      request,
      metadata || {},
      methodDescriptor_Parser_StreamParse);
};


/**
 * @param {!proto.parsing.ParsingRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.parsing.ParsingResult>}
 *     The XHR Node Readable Stream
 */
proto.parsing.ParserPromiseClient.prototype.streamParse =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/parsing.Parser/StreamParse',
      request,
      metadata || {},
      methodDescriptor_Parser_StreamParse);
};


module.exports = proto.parsing;

