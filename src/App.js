import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { BehaviorSubject, combineLatest, timer, concat } from 'rxjs';
import { flatMap, map, debounce, filter , tap} from 'rxjs/operators';

import Main from './components/Main/Main';
import TopBar from './components/TopBar/TopBar';
import './App.scss';

import componentWithStream from './common/componentWithStream';
import {getGifs} from './common/httpObservable';

// import faker from 'faker';
const App = ({
    keyword,
    filter,
    images = [],
    onChangeQuery,
    onSelectKeyword}) => {
    return (
      <div className="App">

        <TopBar data={keyword}/>
        <p>keyword = {keyword} - filter = {filter}</p>

        <ul>
          {images.map(image => (
            <li key={image.id}>
              <a href={image.url}>
                {image.images && image.downsized_small || image.title}
              </a>
            </li>
          ))}
        </ul>
        <Router>
            <Route path='/' component={Main} />
        </Router>
        <footer>
            © shihoko ui 2019
        </footer>
      </div>
    );
};
// class App extends Component {
//   render() {
//     const data = {};
//     return (
//       <div className="App">
//
//         <TopBar data={data}/>
//         <Router>
//             <Route path='/' component={Main} />
//         </Router>
//         <footer>
//             © shihoko ui 2019
//         </footer>
//       </div>
//     );
//   }
// }
const query$ = new BehaviorSubject("cats");
const filter$ = new BehaviorSubject();

//input value changed through user typing.  be sure to retrieve a value and value every so often
const queryForFetch$ = query$.pipe(
  debounce(() => timer(1000)),
  filter(query => query !== ''),
);

//every time filter values (predefined) or keyword was retrieved, fetch operation get executed
const fetch$ = combineLatest(filter$, queryForFetch$)
    .pipe(
        tap(console.warn),
        flatMap(([filter, query]) => {
          return loadImages(filter, query);
        })
  );

//initial items to be emitted
const initialFetch$ = loadImages('', "dogs");

//to be subscribed by container component
const images$ = concat(initialFetch$, fetch$);

// images$
//     .pipe(
//         tap(() => console.log('HTTP request executed')),
//         map(res => Object.values(res['payload']))
//     )
//     .subscribe(
//         images => {
//             console.log("images updated...", images);
//         }
//     );
// loadImages({"q": "dogs"}).subscribe(data => {
//     images = data;
// });
function loadImages(f,q) {
    const query = q ? {q: q} : (f ? {q: f} : null);
    return getGifs(query)
        .pipe(
            map(result => {
                console.log("result init--", result);
                return result.data
            })
        );
}

export default componentWithStream(
    combineLatest(
      query$,
      filter$,
      images$,
      (keyword, filter, images) => ({
        keyword,
        filter,
        images,
      }),
    ),
    {
      onSelectKeyword: keyword => query$.next(keyword),
      onChangeQuery: value => filter$.next(value),
    },
    {
      keyword: 'cat sleeping',
      filter: '',
      images: [],
    },

    images$

)(App);
