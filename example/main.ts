import * as _ from 'lodash';
function argsParser(args: any) {

  return {
    a: args?.a,
    b: args?.b,
  };
}

const args: any = {
  c: 1
};


const res = argsParser(args);
console.dir(res);
console.log(_.isNil(res));
