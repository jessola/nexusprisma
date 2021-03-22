import { asNexusMethod } from 'nexus';
import { GraphQLDateTime } from 'graphql-iso-date';

export const DateTime = asNexusMethod(GraphQLDateTime, 'date');
