/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./../context/index"
import { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BooleanFilter: { // input type
    equals?: boolean; // Boolean
    not?: NexusGenInputs['BooleanFilter']; // BooleanFilter
  }
  IntFilter: { // input type
    equals?: number; // Int
    gt?: number; // Int
    gte?: number; // Int
    in?: number[]; // [Int!]
    lt?: number; // Int
    lte?: number; // Int
    not?: NexusGenInputs['IntFilter']; // IntFilter
    notIn?: number[]; // [Int!]
  }
  LoginUserInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  RegisterUserInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  StringFilter: { // input type
    contains?: string; // String
    endsWith?: string; // String
    equals?: string; // String
    gt?: string; // String
    gte?: string; // String
    in?: string[]; // [String!]
    lt?: string; // String
    lte?: string; // String
    not?: NexusGenInputs['StringFilter']; // StringFilter
    notIn?: string[]; // [String!]
    startsWith?: string; // String
  }
  UserOrderByInput: { // input type
    email?: NexusGenEnums['OrderByArg']; // OrderByArg
    firstName?: NexusGenEnums['OrderByArg']; // OrderByArg
    id?: NexusGenEnums['OrderByArg']; // OrderByArg
    joinedAt?: NexusGenEnums['OrderByArg']; // OrderByArg
    lastName?: NexusGenEnums['OrderByArg']; // OrderByArg
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][]; // [UserWhereInput!]
    NOT?: NexusGenInputs['UserWhereInput'][]; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][]; // [UserWhereInput!]
    email?: NexusGenInputs['StringFilter']; // StringFilter
    firstName?: NexusGenInputs['StringFilter']; // StringFilter
    id?: NexusGenInputs['IntFilter']; // IntFilter
    joinedAt?: NexusGenInputs['StringFilter']; // StringFilter
    lastName?: NexusGenInputs['StringFilter']; // StringFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string; // String
    id?: number; // Int
  }
}

export interface NexusGenEnums {
  OrderByArg: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  LoginResponse: { // root type
    success: boolean; // Boolean!
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  MeResponse: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: {};
  Query: {};
  RegisterResponse: { // root type
    success: boolean; // Boolean!
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  User: { // root type
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    joinedAt: NexusGenScalars['DateTime']; // DateTime!
    lastName: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  LoginResponse: { // field return type
    success: boolean; // Boolean!
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  MeResponse: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    loginUser: NexusGenRootTypes['LoginResponse']; // LoginResponse!
    logoutUser: boolean; // Boolean!
    registerUser: NexusGenRootTypes['RegisterResponse']; // RegisterResponse!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  RegisterResponse: { // field return type
    success: boolean; // Boolean!
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    joinedAt: NexusGenScalars['DateTime']; // DateTime!
    lastName: string; // String!
    name: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  LoginResponse: { // field return type name
    success: 'Boolean'
    token: 'String'
    user: 'User'
  }
  MeResponse: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    loginUser: 'LoginResponse'
    logoutUser: 'Boolean'
    registerUser: 'RegisterResponse'
  }
  Query: { // field return type name
    me: 'User'
    user: 'User'
    users: 'User'
  }
  RegisterResponse: { // field return type name
    success: 'Boolean'
    token: 'String'
    user: 'User'
  }
  User: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'Int'
    joinedAt: 'DateTime'
    lastName: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    loginUser: { // args
      input: NexusGenInputs['LoginUserInput']; // LoginUserInput!
    }
    registerUser: { // args
      input: NexusGenInputs['RegisterUserInput']; // RegisterUserInput!
    }
  }
  Query: {
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      orderBy?: NexusGenInputs['UserOrderByInput'][]; // [UserOrderByInput!]
      skip?: number; // Int
      take?: number; // Int
      where?: NexusGenInputs['UserWhereInput']; // UserWhereInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}