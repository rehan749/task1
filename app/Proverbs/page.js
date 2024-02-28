"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Proverbs() {
  const [proverbs, setProverbs] = useState([]);

  useEffect(() => {
    const fetchProverbs = async () => {
      try {
        const response = await fetch(
          "https://wordsapi-nkj3.onrender.com/proverbs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch proverbs");
        }
        const data = await response.json();
        setProverbs(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching proverbs:", error);
      }
    };

    fetchProverbs();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold mb-4">Proverbs</h1>
        <Grid columns={3} doubling stackable>
          {proverbs.map((proverb) => (
            <Grid.Column key={proverb.id}>
              <div>
                <blockquote className="text-xl mb-2">
                  <span className="text-end">
                    <h6 className="font-bold">{proverb.id}</h6>
                  </span>

                  <span>{proverb.series}</span>

                  {proverb.text}
                  <span className="text-xl mb-2">{proverb.origin}</span>
                </blockquote>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Proverbs;
