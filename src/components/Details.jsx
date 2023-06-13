import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Image,
  Header,
  Segment,
  List,
  Button,
  Icon,
  Modal,
  Message,
} from "semantic-ui-react";
import axios from "axios";

const DetailsPage = () => {
  const { pokemon } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotFound, setIsNotFound] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
        );
        const data = response.data;
        setPokemonDetails(data);
        setIsLoading(false);
        checkBookmarkStatus(data.name);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsNotFound(true);
        } else {
          console.error("Error fetching Pokemon details:", error);
        }
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);
  const checkBookmarkStatus = (pokemonName) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.name === pokemonName
    );
    setIsBookmarked(isBookmarked);
  };

  const handleBookmark = () => {
    const bookmarkedPokemon = {
      name: pokemonDetails.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`,
    };
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.name !== pokemonDetails.name
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      alert("Pokemon removed from bookmarks!");
    } else {
      bookmarks.push(bookmarkedPokemon);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setIsBookmarked(true);
      alert("Pokemon bookmarked!");
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : !isNotFound ? (
        <>
          <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
            <Icon name="hashtag" />
            {pokemonDetails.id}
            {" : "}
            {pokemonDetails.name}
          </Header>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
                alt={pokemonDetails.name}
                centered
              />
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h4">Type</Header>
                <List>
                  {pokemonDetails.types.map((type) => (
                    <List.Item key={type.slot}>{type.type.name}</List.Item>
                  ))}
                </List>
              </Segment>
              <Segment>
                <Header as="h4">Abilities</Header>
                <List>
                  {pokemonDetails.abilities.map((ability) => (
                    <List.Item key={ability.slot}>
                      {ability.ability.name}
                    </List.Item>
                  ))}
                </List>
              </Segment>
              <Segment>
                <Header as="h4">Stats</Header>
                <List>
                  {pokemonDetails.stats.map((stat) => (
                    <List.Item key={stat.stat.name}>
                      <strong>{stat.stat.name}: </strong>
                      {stat.base_stat}
                    </List.Item>
                  ))}
                </List>
              </Segment>
              <Segment>
                <Header as="h4">Moves</Header>
                <List>
                  {pokemonDetails.moves.slice(0, 4).map((move) => (
                    <List.Item key={move.move.name}>
                      <strong>{move.move.name}</strong>
                    </List.Item>
                  ))}
                </List>
                {pokemonDetails.moves.length > 4 && (
                  <Modal
                    size="tiny"
                    trigger={
                      <Button onClick={handleModalOpen}>View All Moves</Button>
                    }
                    open={isModalOpen}
                    onClose={handleModalClose}
                  >
                    <Modal.Header>All Moves</Modal.Header>
                    <Modal.Content>
                      <List>
                        {pokemonDetails.moves.map((move) => (
                          <List.Item key={move.move.name}>
                            <strong>{move.move.name}</strong>
                          </List.Item>
                        ))}
                      </List>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={handleModalClose}>Close</Button>
                    </Modal.Actions>
                  </Modal>
                )}
              </Segment>
              <Button primary fluid onClick={handleBookmark}>
                {isBookmarked ? (
                  <>
                    <Icon name="bookmark" />
                    Remove from Bookmarks
                  </>
                ) : (
                  <>
                    <Icon name="bookmark outline" />
                    Add to Bookmarks
                  </>
                )}
              </Button>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <Message negative style={{ width: "50%" }}>
          <Message.Header>Cannot find the pokemon Try Again!</Message.Header>
          <p>Check Spelling!</p>
        </Message>
      )}
    </div>
  );
};

export default DetailsPage;
