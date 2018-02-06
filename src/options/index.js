import inKey from './key';
import inValue from './value';
import limitScope from './limit-scope';
import intersect from './intersect';
import indexer from './indexer';
import oneOrMany from './one-or-many';
import type from './type';
import returnType from './return-type';

export default {...inKey, ...inValue, ...limitScope, ...intersect, ...indexer, ...oneOrMany, ...type, ...returnType};