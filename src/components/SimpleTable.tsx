import React from 'react'
import { TableProps } from './Table'


export default function SimpleTable(props: TableProps) {
    return (
        <table style={{ margin: "auto" }}>
            <thead>
                <tr>
                    {props.headCells.map((item, idx) => {
                        return <th key={idx}>{item.label}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.rows.map((item, idx) => {
                    return <tr>
                        {props.headCells.map((head, idx) => {
                            return <td key={idx}>{item[head.id]}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    )
}