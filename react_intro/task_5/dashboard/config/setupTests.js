const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream } = require('node:stream/web');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;

const { configure } = require('enzyme');
const Adapter = require('@cfaester/enzyme-adapter-react-18');

configure({ adapter: new Adapter() });
