const fetch = require('node-fetch');
const co = require('co');

const url = 'https://jsonplaceholder.typicode.com/posts/1';

/** 1- fetch endpoint with promises
  fetch(url)
  .then( res => res.json() )
  .then( post => post.title )
  .then( x => console.log(x) )
*/

/** 2- co
  co( function* () {
    const response = yield fetch(url);
    const post = yield response.json();
    const title = post.title;
    console.log(title);
  });
*/

/** 3- Create Co version */

/**
 * @param {promise} generator
 */
function run(generator) {
  const iterator = generator();
  const iteration = iterator.next();

  /**
   * @param {object} iteration
   * @return {object} next gen value
   */
  function iterate(iteration) {
    const promise = iteration.value;
    if(iteration.done) return iteration.value;
    return promise.then((x) => iterate(iterator.next(x)));
  }

  return iterate(iteration);
}

run( function* () {
  const response = yield fetch(url);
  const post = yield response.json();
  const title = post.title;
  return title
})
.catch(err => console.log(err))
.then(x => console.log('result ', x));

;
