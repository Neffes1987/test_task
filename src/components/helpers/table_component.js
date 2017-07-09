import React from 'react'
import { Link } from 'react-router'
export default class Table_component extends React.Component {
    constructor(props) {
        super(props);
    }
    _is_link(str){
        if(!str) return ''
        var pattern = /(https?:\/\/)?([\w.-]*\.[\w.-]+\.[\w]{2,6}\S*)/gim,
            urls = str.match(pattern),
            parsed_text = str.replace(/\n/gi,'<br/>');

        if(!urls) return parsed_text;
        urls.forEach((value)=>{
            parsed_text = parsed_text.replace(value,'<a target = "_blank" href="'+value+'">'+ value +'</a>')
        });

        return parsed_text;
    }
    render() {
        const stack = this.props.stack || [],
              bsClass = this.props.bsClass || '',
              active_column = this.props.active_column || {},
              filterFieldChange = this.props.filterFieldChange,
              values = this.props.values || [];
        return (
            <table className={'table table-bordered '+bsClass}>
                <thead>
                    <tr className='table-header'>
                        {stack.map((header_item,idx)=>{
                            var is_active = ( active_column.name == header_item.param ),
                                hovered = !header_item.no_sortable ? 'hovered ': '';
                            return (
                                <td
                                    key = {idx}
                                    style = {{width:header_item.width+'px',minWidth:header_item.width+'px'}}
                                    className={hovered + ( is_active ? 'active' : '' )}
                                    colSpan = {header_item.colspan || ''}
                                    onClick ={!header_item.no_sortable ?
                                        filterFieldChange.bind(
                                            null,
                                            'active_column',
                                            {
                                                name:header_item.param,
                                                numeric: header_item.numeric || false,
                                                reverce: active_column.reverce!=undefined ? !active_column.reverce : false
                                            }
                                        ):()=>{}
                                    }
                                    >
                                    {header_item.title}
                                </td>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        values.map((row,idx)=>{
                            return (
                                <tr key={idx}>
                                    {stack.map((stack,idx)=>{
                                        let cell_value;
                                        switch (stack.component) {
                                            case 'textarea':
                                                cell_value = (
                                                    <textarea
                                                        rows = {stack.rows}
                                                        value = {row[stack.param]}
                                                        onChange={(e)=>{
                                                            stack.callback(row.id,e.target.value);
                                                        }}/>
                                                )
                                                break;
                                            case 'link':
                                                cell_value = (
                                                    <a  target='_blank'
                                                        href ={stack.url+row[stack.url_param]} >{row[stack.param]}</a>
                                                )
                                                break;
                                            case 'img':
                                                cell_value = (
                                                    <img src = {row[stack.param]}/>
                                                )
                                                break;
                                            case 'html':
                                                let str_comment = this._is_link(row[stack.param]);
                                                cell_value = (
                                                    <div dangerouslySetInnerHTML={{__html: str_comment}}></div>
                                                )
                                                break;
                                            case 'route':
                                                const url = stack.url ? stack.url.replace('[param]',row[stack.param]):'';
                                                cell_value = (
                                                    <Link to={url}>{row[stack.param]}</Link>
                                                )
                                                break;
                                            case 'custom':
                                                const params = {};
                                                stack.param.forEach((value)=>{
                                                    params[value] = row[value];
                                                })
                                                cell_value = stack.creator(params);
                                                break;
                                            default: cell_value = row[stack.param];

                                        }
                                        return (
                                            <td key = {idx}
                                                className = {stack.td_class || ''}
                                                >
                                                {cell_value}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}
