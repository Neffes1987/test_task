//main.jsx
import React from 'react'
import Panel from './helpers/Panel'
import { connect } from 'react-redux'
import InputGroup from './helpers/inputGroup'
import Action_buttons from './helpers/Action_buttons'
import Table_component from './helpers/table_component'
import Select from './helpers/select'
import action_creator from '../action_creator'
import {Link} from 'react-router'


export class Employees extends React.Component {
    constructor(props) {
        super(props);
    }
    fetch_employees(){
        this.props.fetch_data('/employee','GET',(data)=>{
            this.props.generateSimpleAction('CUSTOM_DATA_FETCH','employees','',data)
        })
        this.props.fetch_data('/department','GET',(data)=>{
            this.props.generateSimpleAction('CUSTOM_DATA_FETCH','department','',data)
        })
    }
    getSelectValue (obj, label, value, no_sort) {
        var arr = []
        let tmp = {},_label,_value
        for (var key in obj){
            let tmp_val = Array.isArray(obj[key])?obj[key][0]:obj[key];
            _label =!label? tmp_val : tmp_val[label];
            _value =!value? key : tmp_val[value];
            arr.push({label: _label.trim().replace(/\s+/gi,' '),value: _value})
        }
        tmp = _.sortBy(arr, function(o) { return o.label; });
        return !no_sort ? tmp : arr;
    }
    componentWillMount() {
        this.fetch_employees()
    }
    generateDepartmentSelect(department_stack,params){
        let options = this.getSelectValue(department_stack,'name','id')
        return(
            <Select
                value = {'' + params.departmentId}
                optionsMap = {options}
                onChangeSelect = {this.custom_data_employee_change.bind(this,params.id,'departmentId')}
                />
        )
    }
    generateInputComp(name,params){
        return(
            <InputGroup
                label = {<span className='glyphicon glyphicon-pencil'></span>}
                iValue = {params[name]}
                func = {this.custom_data_employee_change.bind(this,params.id,name)}
                />
        )
    }
    custom_data_employee_add_new_row(id){
        let template = { id, 'firstName': '', 'lastName': '', 'departmentId': 0 };

        this.props.fetch_data('/employee','POST',(data)=>{
            this.props.showAlert({ mess:'Новый работник добавлен!'})
        },template)

        this.props.generateSimpleAction('CUSTOM_DATA_EMPLOYEE_ADD_NEW_ROW','','',template)
    }
    custom_data_employee_change(id,fld,value){
        this.props.generateSimpleAction('CUSTOM_DATA_EMPLOYEE_CHANGE',id,fld,value)
    }
    save_employee(data,idx){
        let employee = _.find(data,(item)=> item.id == idx)
        this.props.fetch_data('/employee/'+idx,'PUT',(data)=>{
            this.props.showAlert({ mess:'Данные сохранены!' })
        },employee)
    }
    render() {
        const {
            employees:employee_stack = [],
            department:department_stack = [],
            stack = [
                {title:'ID', width:40, param:'id'},
                {
                    title:'Имя',
                    width:200,
                    param:['firstName','id'],
                    component:'custom',
                    creator:this.generateInputComp.bind(this,'firstName')
                },
                {
                    title:'Фамилия',
                    width:200,
                    param:['lastName','id'],
                    component:'custom',
                    creator:this.generateInputComp.bind(this,'lastName')
                },
                {
                    title:'Отдел',
                    width:200,
                    param:['id','departmentId'],
                    component:'custom',
                    creator:this.generateDepartmentSelect.bind(this,department_stack)
                },
                {
                    title:'',
                    param:['id'],
                    component:'custom',
                    td_class:'text-center',
                    creator:(params)=>(
                        <Action_buttons
                            buttons = {[
                                {
                                    title:'Сохранить',
                                    click:this.save_employee.bind(this,employee_stack,params.id)
                                }
                            ]}
                        />
                    )
                },

            ],
            new_value = ''
        } = this.props.custom_data || {}
        return (
            <Panel title='Работники'>
                <div className='clearfix'>
                    <Table_component
                        values = {employee_stack}
                        stack = {stack}
                        filterFieldChange = {()=>{}}
                        />
                </div>
                <Action_buttons
                    buttons = {[
                        {
                            title:'Добавить работника',
                            click:this.custom_data_employee_add_new_row.bind(this,employee_stack.length)
                        }
                    ]}/>
            </Panel>);
    }
}
const mapStateToProps = function(store) {
    return {
        custom_data:store.custom_data
    }
};
const Employees_controller = connect(mapStateToProps, action_creator)(Employees);

export default Employees_controller
