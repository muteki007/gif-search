import React from 'react';

 const componentWithStream = (observable, eventHandlers)=> {
     return (Component) => {
          return class extends React.Component {
            componentDidMount() {
              this.subscription = observable.subscribe((newState) => {
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
