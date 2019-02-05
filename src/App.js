import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { BehaviorSubject, combineLatest, timer, concat } from 'rxjs';
import { flatMap, map, debounce, filter , tap, distinctUntilChanged, switchMap} from 'rxjs/operators';

import Main from './components/Main/Main';
import TopBar from './components/TopBar/TopBar';
import './App.scss';

import componentWithStream from './common/componentWithStream';
import {getGifs} from './common/httpObservable';

// import faker from 'faker';
const App = ({
    keyword,
    filter,
    imageData,
    // images = [],
    // pagination = {},
    onChangeQuery,
    onSelectKeyword}) => {
    //const {data:images=[], pagination={}} = imageData;

    return (
      <div className="App">

        <TopBar keyword={keyword} onSelectKeyword={onSelectKeyword}/>
        <p>keyword = {keyword} - filter = {filter}</p>


        <Router>
            <Route path='/'
             render= {(routeProps) => <Main {...routeProps} imageData={imageData} onChangeQuery={onChangeQuery}/>}
            />
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
const query$ = new BehaviorSubject('');
const filter$ = new BehaviorSubject('');



//input value changed through user typing.  be sure to retrieve a value and value every so often
const queryForFetch$ = query$.pipe(
    tap(console.log("query$", ".......")),
  debounce(() => timer(1000)),
  distinctUntilChanged(),
  switchMap(keyword => keyword),
  filter(query => query !== '')
);

//every time filter values (predefined) or keyword was retrieved, fetch operation get executed
const fetch$ = combineLatest(filter$, queryForFetch$)
    .pipe(
        tap(console.log("filter$ queryForFetch$", ".......")),
        flatMap(([filter, query]) => {
          return loadImages(filter, query||'cats');
        })
  );

//initial items to be emitted
const initialFetch$ = loadImages('', 'dogs');

//to be subscribed by container component
const imageData$ = concat(initialFetch$, fetch$);
// const images$ = imageData$.pipe(
//         map(result=>result.data)
//     );
//     //to be subscribed by container component
// const pagination$ = imageData$
//     .pipe(
//         map(result=>result.pagination)
//     );

// imageData$
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
function loadImages(f,q='') {
    const query = q ? {q: q} : (f ? {q: f} : {});
    return getGifs(query)
        .pipe(
            map(result => {
                return result;
            })
        );
}

export default componentWithStream(
    combineLatest(
      query$,
      filter$,
      imageData$,
      // pagination$,
      (keyword, filter, imageData) => ({
        keyword,
        filter,
        imageData
        // pagination
      }),
    ),
    {
      onSelectKeyword: keyword => query$.next(keyword),
      onChangeQuery: value => filter$.next(value),
    }

)(App);
