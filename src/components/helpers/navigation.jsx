//navigation.jsx

import React from 'react'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
    mixins:[PureRenderMixin],
    render(){
        const {bsClass} = this.props,
        navigation_stack = [
            {url:'/department/', title:'Департамент'},
            {url:'/employees/', title:'Работники'},
        ];
        return(
            <div className={'form-group  bg-info '+bsClass}>
                <h5 className='text-center well well-sm'>Menu</h5>
                <ul className='nav nav-pills nav-stacked'>
                    {navigation_stack.map((item, idx)=>(
                        <li key = {idx} >
                            <Link
                                to={item.url}
                                activeClassName='active'>
                                    {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
    )
}})
