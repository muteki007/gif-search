import React from 'react';

 const componentWithStream = (observable, eventHandlers, initialState, initObservable)=> {
     return (Component) => {
          return class extends React.Component {
            constructor(props) {
              super(props);
              //do I need this?
              // if (initObservable) {
              //     initObservable.subscribe((images)=> {
              //         this.state = {
              //             images:images
              //         };
              //         console.log(images);
              //     });
              // }
              // this.state = {
              //   ...initialState,
              // };
            }

            componentDidMount() {
              // this.subscription = observable.subscribe(newState =>
              //   this.setState({...newState}),
              // );
              this.subscription = observable.subscribe((newState) => {
                console.log("setState::", newState);
                return this.setState({...newState})
              });
            }

            componentWillUnmount() {
              this.subscription.unsubscribe();
            }

            render() {
              return (
                <Component {...this.props} {...this.state} {...eventHandlers} />
              );
            }
          };
      };
};


export default componentWithStream;
