import React, { useState, useEffect } from "react";
//import { AcUnit } from "@material-ui/icons";
import "./home.scss";
import Navbar from "../../componets/navbar/Navbar";
import Featured from "../../componets/featured/Featured";
import List from "../../componets/list/List";
//import List from "../components/list/List";
import axios from "axios";

const Home = ({ type, user }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  console.log("user inside home ::", user);
  console.log("type::", type);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: "Bearer " + user,
            },
          }
        );
        console.log(res.data);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} user={user} />
      {lists.map((list) => (
        <List list={list} user={user} />
      ))}
    </div>
  );
};

export default Home;
