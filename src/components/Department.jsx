//main.jsx
import React from 'react'
import Panel from './helpers/Panel'
import { connect } from 'react-redux'
import InputGroup from './helpers/inputGroup'
import Action_buttons from './helpers/Action_buttons'
import action_creator from '../action_creator'

export class Department extends React.Component {
    constructor(props) {
        super(props);
    }
    change_custom_data(idx,value){
        this.props.generateSimpleAction('CUSTOM_DATA_DEPARTMENT_CHANGE',idx,'',value)
    }
    custom_data_department_add_new_row(new_value,idx){
        this.props.fetch_data('/department','POST',(data)=>{
            this.props.showAlert({ mess:'Данные сохранены!' })
        },{id:''+idx,name:new_value})
        this.props.generateSimpleAction('CUSTOM_DATA_DEPARTMENT_ADD_NEW_ROW')
    }
    fetch_departments(){
        this.props.fetch_data('/department','GET',(data)=>{
            this.props.generateSimpleAction('CUSTOM_DATA_FETCH','department','',data)
        })
    }
    save_departments(data,idx){
        this.props.fetch_data('/department/'+idx,'PUT',(data)=>{
            this.props.showAlert({ mess:'Данные сохранены!' })
        },data[idx])
    }
    componentWillMount() {
        this.fetch_departments()
    }

    render() {
        const {
            department:departments_stack = [],
            new_value = ''
        } = this.props.custom_data || {}
        return (
            <Panel title='Отдел'>
                <div className='clearfix'>
                    <input type='text' defaultValue=''/>
                    {
                        departments_stack.map((item,idx)=>{
                            return (
                                <div  key = {idx} className='row'>
                                    <div className='col-md-12'>
                                        <InputGroup
                                            label = {<span className='glyphicon glyphicon-pencil'></span>}
                                            iValue = {item.name}
                                            func = {this.change_custom_data.bind(this,idx)}
                                            btn_label = 'Сохранить'
                                            btn_func = {this.save_departments.bind(this,departments_stack,idx)}
                                            />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='row'>
                        <div className='col-md-12'>
                            <InputGroup
                                label = {<span className='glyphicon glyphicon-plus-sign'></span>}
                                iValue = {new_value}
                                func = {this.change_custom_data.bind(this,departments_stack.length)}
                                btn_func = {this.custom_data_department_add_new_row.bind(this,new_value,departments_stack.length)}
                                btn_label = 'Добавить'
                                />
                        </div>
                    </div>
                </div>
            </Panel>);
    }
}
const mapStateToProps = function(store) {
    return {
        custom_data:store.custom_data
    }
};
const Department_controller = connect(mapStateToProps, action_creator)(Department);

export default Department_controller
