import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

import { toggleEdit }  from './bubblePageFunctions'

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService(setColors)
  },[])


  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
    .then(() => {
      fetchColorService(setColors)
    })
    .catch(err => console.log('error :', err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
    .then(() => {
      fetchColorService(setColors)
    })
    .catch(err => console.log('error :', err))
  };
  

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} setEditing={setEditing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
