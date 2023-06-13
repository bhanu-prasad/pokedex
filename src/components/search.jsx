import React from "react";
import { Button, Image, Input } from "semantic-ui-react";
import pikachu from "../assets/pikachu.png";
import { useOutletContext } from "react-router-dom";
export default function Search() {
  const [handleSearch, setSearchTerm] = useOutletContext();
  return (
    <div className="Body">
      <Image src={pikachu} size="medium" />
      <Input
        icon="search"
        placeholder="Search..."
        style={{ width: "30%" }}
        focus
        onChange={(e, { value }) => {
          setSearchTerm(value);
        }}
      />
      <Button color="blue" style={{ marginTop: "10px" }} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
