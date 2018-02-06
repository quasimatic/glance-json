import inKey from './key';
import inValue from './value';
import limitScope from './limit-scope';
import intersect from './intersect';
import position from './position';
import oneOrMany from './one-or-many';
import type from './type';
import returnType from './return-type';

export default {...inKey, ...inValue, ...limitScope, ...intersect, ...position, ...oneOrMany, ...type, ...returnType};