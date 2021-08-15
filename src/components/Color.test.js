import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor, rerender, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color  from './Color';
// jest.mock('./BubblePage') , { handleDelete as mockHandleDelete }

// import { toggleEdit as mockToggleEdit } from './bubblePageFunctions'
// jest.mock('./bubblePageFunctions', () => () => true)


const color = {
    code: { hex: "#f0f8ff"},
    color: "aliceblue",
    id: 1
}

const blankColor = {
    code: { hex: ""},
    color: "",
    id: ""
}




test("Renders without errors with blank color passed into component", () => {
    const { getAllByTestId } = render(<Color color={blankColor}/>)
    expect(getAllByTestId(/color/i)).toHaveLength(1)
});

test("Renders the color passed into component", () => {
    const { queryByTestId, getByTestId, rerender } = render(<Color color={blankColor}/>)
    const colorLi = queryByTestId(/colors/i)
    expect(colorLi).toBeNull();
    rerender(<Color color={color} />)
    getByTestId(/color/i)
});



test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const { queryByTestId, getAllByTestId } = render(<Color color={color}/>)
    const delButton = queryByTestId(/delete/i)
    fireEvent.click(delButton)
    expect(mockToggleEdit).toHaveBeenCalledTimes(1)
    expect(getAllByTestId(/color/i)).toHaveLength(0)
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    
});