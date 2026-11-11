import { render, screen } from '@testing-library/react'
import DropdownPortal from './DropdownPortal'

describe('DropdownPortal', () => {
  it('renders nothing when there is no anchor', () => {
    const { container } = render(
      <DropdownPortal anchor={null}>Dropdown content</DropdownPortal>
    )

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByText('Dropdown content')).not.toBeInTheDocument()
  })

  it('renders children in the document body when anchored', () => {
    const anchor = document.createElement('button')
    anchor.getBoundingClientRect = jest.fn(() => ({
      bottom: 20,
      left: 30,
      right: 40,
      top: 10,
      width: 10,
      height: 10,
      x: 30,
      y: 10,
      toJSON: jest.fn(),
    }))

    render(
      <DropdownPortal anchor={anchor}>Dropdown content</DropdownPortal>
    )

    expect(screen.getByText('Dropdown content')).toBeInTheDocument()
    expect(screen.getByText('Dropdown content')).toHaveStyle({
      position: 'fixed',
      top: '20px',
      left: '30px',
    })
  })
})
