import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Image, Header, Segment } from "semantic-ui-react";

const Bookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  return (
    <div>
      <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
        Bookmarks
      </Header>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <Grid container columns={3} stackable>
          {bookmarks.map((bookmark) => (
            <Grid.Column key={bookmark.name} as={NavLink} to={"/details/"+bookmark.name}>
              <Segment>
                <Image
                  src={bookmark.image}
                  alt={bookmark.name}
                  centered
                  size="small"
                />
                <Header as="h4">{bookmark.name}</Header>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Bookmarks;
