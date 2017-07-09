export default (dispatch) => {
    return {
        generateSimpleAction: (action,block,fld,value) => { dispatch({type:action.toUpperCase(),value,fld,block})
        },
        showAlert: (params) =>{
            var mess = params.mess || 'ok',
                type = params.type || 'success',
                name = params.name || 'default_name';
            dispatch({
                type: 'ALERT',
                alertKey: name,
                alertType: type,
                text: mess,
                show: true
            })
        },
        fetch_data:(url,method,callback,data)=>{
            jQuery.ajax({
                    method,
                    url:'http://localhost:3000'+ url,
                    data,
                    success: (data)=>{
                        callback(data);
                    }
            });
        }
    }
}
