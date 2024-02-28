"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";

function Dialogues() {
  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    fetch("https://wordsapi-nkj3.onrender.com/dialogues")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); // Log the data structure
        setDialogues(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
    <Container>
    <h1 className="text-3xl font-bold mb-4">Dialogues</h1>
    <Grid columns={3} doubling stackable>
      {dialogues.map(dialogue => (
        <Grid.Column key={dialogue.id}>
          <div>
           
              <blockquote className="text-xl mb-2">
              <span className='text-end'>
              <h6 className="font-bold">{dialogue.id}</h6>
              </span>
          
              <span>{dialogue.series}</span>
                
                {dialogue.text}  
              <h2 className="text-xl mb-2">{dialogue.character}</h2>
             
              </blockquote>
         
          </div>
        </Grid.Column>
      ))}
    </Grid>


  </Container>
    </>
  );
}

export default Dialogues;
