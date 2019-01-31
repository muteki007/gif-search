import {Observable} from 'rxjs';
import GphApiClient from 'giphy-js-sdk-core';

const gClient = GphApiClient('U0sYliub0abdnMp5NHO7IbWQwJXaeRPD');

const httpObservable = (reqArgs) => {

    // const url = this.url;
    return Observable.create(observer => {

        const controller = new AbortController();
        const signal = controller.signal;
        const {url} = reqArgs;
        if (url) {
            fetch(url, {signal})
                .then(response => {

                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        observer.error('Request failed with status code: ' + response.status);
                    }
                })
                .then(body => {

                    observer.next(body);

                    observer.complete();

                })
                .catch(err => {

                    observer.error(err);

                });

        } else {
            return;
        }



        return () => controller.abort()


    });

}
export const getGifs = (reqArgs) => {

    return Observable.create(observer => {
        const {q = '', limit = 25, offset = 0, rating, lang, fmt, sort} = reqArgs;
        const options = {q, limit, offset};
        if (rating) {
            options.rating = rating;
        }
        if (lang) {
            options.lang = lang;
        }
        if (sort) {
            options.sort = sort;
        }
        if (fmt) {
            options.fmt = fmt;
        }
        gClient.search('gifs', options)
          .then((response) => {
              return response;
            // response.data.forEach((gifObject) => {
            //   console.log(gifObject)
          })
          .then(body => {

                observer.next(body);

                observer.complete();

            })
          .catch((err) => {
              observer.error(err);
          });

    });

}
export default httpObservable;
