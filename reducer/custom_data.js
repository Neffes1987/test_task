var initialState = {
    department:[],
    employees:[],
    new_value:''
}
function custom_data(state = initialState, action) {
    let clone = Object.assign({}, state);
    switch (action.type) {
        case 'CUSTOM_DATA_FETCH':
            clone[action.block] = action.value;
            return clone;
        case 'CUSTOM_DATA_DEPARTMENT_CHANGE':
            if(!clone['department'][action.block]){
                clone['new_value'] = action.value
            }else{
                clone['department'][action.block]['name'] = action.value;
            }
            return clone;
        case 'CUSTOM_DATA_DEPARTMENT_ADD_NEW_ROW':
            clone['department'].push({name:clone['new_value'],id:clone['department'].length});
            clone['new_value'] = '';
            return clone;
        case 'CUSTOM_DATA_EMPLOYEE_ADD_NEW_ROW':
            clone['employees'].push(action.value);
            return clone;
        case 'CUSTOM_DATA_EMPLOYEE_CHANGE':
            let employee = _.find(clone['employees'],(item)=>item.id == action.block);
            if(employee){
                employee[action.fld] = action.value
            }
            return clone;
        default:
            return state;
    }
}
export default custom_data;
