import { match } from 'ts-pattern'

export interface Column<T, K extends keyof T> {
  title: string
  dataIndex?: K
  render?: (record: T) => React.ReactNode
}

export interface TableProps<T, K extends keyof T> {
  data: Array<T>
  columns: Array<Column<T, K>>
}

export const Table = <T extends object, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.title}>
                {column.render
                  ? column.render(item)
                  : column.dataIndex
                  ? item[column.dataIndex]
                  : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// interface Column<T> {
//   title: string
//   dataIndex: keyof T
//   render?: (record: T) => React.ReactNode
// }

// interface TableProps<T> {
//   data: T[]
//   columns: Column<T>[]
// }

// export const Table = <T extends {}>({ data, columns }: TableProps<T>) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map(column => (
//             <th key={column.title}>{column.title}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             {columns.map(column => (
//               <td key={column.title}>
//                 {column.render ? column.render(item) : item[column.dataIndex]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }
