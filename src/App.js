import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Observable} from 'rxjs';
import { BehaviorSubject, combineLatest, timer, concat } from 'rxjs';
import { flatMap, map, debounceTime, filter , tap, distinctUntilChanged, switchMap, of} from 'rxjs/operators';

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
const keyword$ = new BehaviorSubject('x');
const filter$ = new BehaviorSubject('test');



//input value changed through user typing.  be sure to retrieve a value and value every so often
const queryForFetch$ = keyword$.pipe(
    map(val => val),
    debounceTime(1500),
    distinctUntilChanged(),
    filter(keyword => keyword !== '')


);

// .pipe(
//                 map(event => event.target.value),
//                 debounceTime(400),
//                 distinctUntilChanged(),
//                 switchMap(search => this.loadLessons(search))
//             );
//every time filter values (predefined) or keyword was retrieved, fetch operation get executed
const fetch$ = combineLatest(filter$, queryForFetch$, (filter, query) => [filter, query])
    .pipe(
        // map(res => res),
        switchMap(([filter, query]) => {

            console.log('-------query', query);
            return loadImages(filter, query)
        })
  );

//initial items to be emitted
const initialFetch$ = loadImages('', 'dogs');

//to be subscribed by container component
const imageData$ = concat(initialFetch$, fetch$);

function loadImages(f,q='') {
    console.log("f,q",f,q);
    const query = q ? {q: q} : (f ? {q: f} : {});
    console.log("called loadImages", query);
    return getGifs(query)
        .pipe(
            map(result => {
                console.log("return images");
                return result;
            })
        );
}

export default componentWithStream(
    combineLatest(
      keyword$,
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

      onChangeQuery: value => filter$.next(value),
      onSelectKeyword: keyword => keyword$.next(keyword)
    }

)(App);
