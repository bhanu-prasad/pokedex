import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Image, Loader, Button, Header } from "semantic-ui-react";
import axios from "axios";

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=4&offset=${
          (currentPage - 1) * 4
        }`
      );
      const data = response.data.results;
      setPokemonList((prevList) => [...prevList, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  useEffect(() => {
    setPokemonList([]);
    fetchPokemonList();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
        Pokemon Listing Page
      </Header>
      {isLoading ? (
        <Loader active>Loading</Loader>
      ) : (
        <>
          <Grid container columns={4} doubling stackable>
            {pokemonList.map((pokemon) => (
              <Grid.Column
                key={pokemon.name}
                as={NavLink}
                to={"/details/" + pokemon.name}
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.name}
                  centered
                />
                <Header
                  as="h4"
                  textAlign="center"
                  style={{ marginTop: "10px" }}
                >
                  {pokemon.name}
                </Header>
              </Grid.Column>
            ))}
          </Grid>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              color="blue"
            >
              Prev
            </Button>
            <span style={{ margin: "0px 10px", fontSize: "20px" }}>
              {currentPage}
            </span>
            <Button onClick={handleLoadMore} color="green">
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPage;
