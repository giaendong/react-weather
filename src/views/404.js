import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
      return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='error-template text-center mt-5'>
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className='error-details'>
                            Sorry, an error has occured, Requested page not found!
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }