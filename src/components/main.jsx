//main.jsx
import React from 'react'
import Menu from './helpers/navigation'
import Alert from './helpers/Alert'
import ReactSpinner from './helpers/ReactSpinner'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container'>
                <div
                    className={'row' + ' 444'}
                    >
                    <Alert/>
                    <ReactSpinner/>
                    <div className='col-md-3'><Menu {...this.props}/></div>
                    <div className='col-md-9'>
                        <div className='inner'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
