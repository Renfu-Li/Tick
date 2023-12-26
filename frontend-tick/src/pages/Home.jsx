import { Grid } from "@mui/material";

import Lists from "../components/Lists";
import Tasks from "../components/Tasks";
import SideBar from "../components/SideBar";
import taskService from "../services/taskService";
import { useEffect, useState } from "react";
import listService from "../services/listService";

export default function Home({ token, setToken }) {
  const [allTasks, setAllTasks] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [listToShow, setListToShow] = useState("today");

  useEffect(() => {
    if (token) {
      // get all tasks
      taskService
        .getAllTasks(token)
        .then((tasks) => {
          setAllTasks(tasks);
        })
        .catch((error) => {
          console.log("error from taskService in Home: ", error.message);
        });

      // get all lists
      listService
        .getAllList(token)
        .then((lists) => {
          const listInfo = lists.map((list) => {
            return {
              listName: list.listName,
              id: list.id,
            };
          });
          setAllLists(listInfo);
        })
        .catch((error) => {
          console.log("error from listService in Home: ", error.message);
        });
    }
  }, [token]);

  console.log(allLists);

  return (
    <Grid container>
      <Grid item xs={1}>
        <SideBar setToken={setToken}></SideBar>
      </Grid>
      <Grid item xs={3}>
        <Lists
          allLists={allLists}
          setAllLists={setAllLists}
          setListToShow={setListToShow}
          token={token}
        ></Lists>
      </Grid>
      <Grid item xs={8}>
        <Tasks
          listToShow={listToShow}
          token={token}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          allLists={allLists}
          setAllLists={setAllLists}
        ></Tasks>
      </Grid>
    </Grid>
  );
}
