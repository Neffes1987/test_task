//Panel.jsx
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default React.createClass({
    mixins:[PureRenderMixin],
    render(){
        const children  = this.props.children || '';
        const title  = this.props.title || '';
        const bsClass = this.props.bsClass || 'default';

        return(
            <div className={'panel panel-'+bsClass}>
                <div className='panel-heading'>
                    <h3 className='panel-title'>{title}</h3>
                </div>
                <div className='panel-body'>
                    {children}
                </div>
            </div>

        )
}})
