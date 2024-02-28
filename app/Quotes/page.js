"use client"
import React, { useState, useEffect } from 'react';
import { Container, Grid, Header, Button } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";


const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://wordsapi-nkj3.onrender.com/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const { quotes } = await response.json();
        setQuotes(quotes);
        setFilteredQuotes(quotes); // Initially, set filteredQuotes to all quotes
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  const handleFilter = (author) => {
    if (author === 'All') {
      setFilteredQuotes(quotes);
    } else {
      const filtered = quotes.filter(quote => quote.author === author);
      setFilteredQuotes(filtered);
    }
    setActiveFilter(author);
  };

  const showAllAuthors = () => {
    const allAuthors = [...new Set(quotes.map(quote => quote.author))];
    return allAuthors.map((author, index) => (
      <Button
        key={index}
        onClick={() => handleFilter(author)}
        active={activeFilter === author}
        style={{ marginRight: '5px', marginBottom: '5px', backgroundColor: activeFilter === author ? '#78C0A8' : 'grey', color: 'white' }}
      >
        {author}
      </Button>
    ));
  };

  return (
    <Container>
    
      <Header as="h1" className="text-2xl font-bold mb-4 mt-4">Quotes</Header>
      <div className="my-4 text-center">
        <Button className='py-4'
          onClick={() => handleFilter('All')}
          active={activeFilter === 'All'}
          style={{ marginRight: '5px', marginBottom: '5px', backgroundColor: activeFilter === 'All' ? '#78C0A8' : 'grey', color: 'white' }}
        >
          Show All Authors
        </Button>
        {showAllAuthors()}
      </div>
      <Grid columns={5}>
        {filteredQuotes.map(quote => (
          <Grid.Column key={quote.id}>
           
              <blockquote className="text-xl mb-2">
                <span className='text-end'>
              <h6 className="font-bold">{quote.id}</h6>

                </span>
                <span>{quote.author}</span>
                <p>{quote.text}</p> 
              </blockquote>
          
          </Grid.Column>
        ))}
      </Grid>
    </Container>
     
  );
};

export default Quotes;
