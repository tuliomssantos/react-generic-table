import { render, screen, within } from '@testing-library/react'
import { Column, Table } from './Table'

interface Person {
  name: string
  age: number
}

const data: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
]

describe('<Table />', () => {
  it('should render table with data and columns', () => {
    const columns: Column<Person, keyof Person>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
    ]

    render(<Table data={data} columns={columns} />)

    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()

    const tableHeadCells = screen.getAllByRole('columnheader')
    expect(tableHeadCells).toHaveLength(columns.length)
    expect(tableHeadCells[0]).toHaveTextContent('Name')
    expect(tableHeadCells[1]).toHaveTextContent('Age')

    const tableBody = screen
      .getByRole('table')
      .querySelector('tbody') as HTMLElement

    const tableBodyRows = within(tableBody).getAllByRole('row')

    expect(tableBodyRows).toHaveLength(data.length)

    const tableBodyCells = screen.getAllByRole('cell')
    expect(tableBodyCells).toHaveLength(data.length * columns.length)

    expect(tableBodyCells[0]).toHaveTextContent('Alice')
    expect(tableBodyCells[1]).toHaveTextContent('25')
    expect(tableBodyCells[2]).toHaveTextContent('Bob')
    expect(tableBodyCells[3]).toHaveTextContent('30')
  })

  // it('should render custom element for a column', () => {
  //   const columnsWithRender: Column<Person, keyof Person>[] = [
  //     {
  //       title: 'Name',
  //       dataIndex: 'name',
  //     },
  //     {
  //       title: 'Age',
  //       dataIndex: 'age',
  //     },
  //     {
  //       title: 'Actions',
  //       render: () => (
  //         <>
  //           <button>Delete</button>
  //           <button>Duplicate</button>
  //         </>
  //       ),
  //     },
  //   ]

  //   render(<Table data={data} columns={columnsWithRender} />)
  //   const tableBodyCells = screen.getAllByRole('cell')
  //   expect(tableBodyCells).toHaveLength(data.length * columnsWithRender.length)
  //   expect(tableBodyCells[4]).toContainHTML('<button>Delete</button>')
  //   expect(tableBodyCells[5]).toContainHTML('<button>Duplicate</button>')
  // })
})
