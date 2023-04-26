import React from 'react';
import './Table.scss';

const Table = ({ tableTitle, tableHead, data }) => {
  return (
    <table>
      <caption>{tableTitle}</caption>
      <tr>
        {tableHead?.map((element, index) => (
          <th key={index}>{element}</th>
        ))}
      </tr>
      {data?.map((procedure, procedureIndex) => (
        <tr key={procedureIndex}>
          {procedure?.map((element, index) => (
            <td key={index}>{element}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Table;
