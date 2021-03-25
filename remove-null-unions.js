require('colors').enable();

const path = require('path');
const fs = require('fs');

const PATH = path.join('src', 'lib', 'schema', 'generated', 'types.ts');
const NULL_REGEX = /\s?\|\snull\s?/g;
const DELAY = 5000; // Necessary to override codegen

setTimeout(() => {
  const data = fs.readFileSync(PATH, { encoding: 'utf-8' });

  /* Gen Inputs and Enums */
  const inputStart = data.search(/export interface NexusGenInputs/);
  const inputEnd = data.search(/export interface NexusGenScalars/);
  const inputString = data.substring(inputStart, inputEnd);

  /** Gen Objects */
  const objectStart = data.search(/export interface NexusGenObjects/);
  const objectEnd = data.search(/export interface NexusGenInterfaces/);
  const objectString = data.substring(objectStart, objectEnd);

  /** Gen Arg Types */
  const argTypeStart = data.search(/export interface NexusGenArgTypes/);
  const argTypeEnd = data.search(
    /export interface NexusGenAbstractTypeMembers/
  );
  const argTypeString = data.substring(argTypeStart, argTypeEnd);

  let output = data
    .replace(inputString, inputString.replace(NULL_REGEX, ''))
    // .replace(objectString, objectString.replace(NULL_REGEX, ''))
    .replace(argTypeString, argTypeString.replace(NULL_REGEX, ''));

  fs.writeFileSync(PATH, output, { encoding: 'utf-8' });
  console.log('Removed null type unions'.bgGreen.black);
}, DELAY);
