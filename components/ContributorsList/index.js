import React, { useState } from "react";
import axios from "axios";
import styles from "./ContributorsList.module.css";

import Title from "../Title";
import ContributorsCard from "../ContributorsCard";
import Modal from "../Modal";

const ContributorsList = ({ contributors }) => {
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  async function seeContributorsRepo(username) {
    setModal(true);
    setModalLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );
    setRepositories(res.data);
    setModalLoading(false);
  }

  function hideModal() {
    setModal(false);
  }

  return (
    <div>
      <Title>Top Contributors</Title>

      <div className={styles.grid}>
        {contributors.map((contributor) => {
          return (
            <ContributorsCard
              key={contributor.id}
              contributor={contributor}
              seeContributorsRepo={seeContributorsRepo}
            />
          );
        })}
      </div>

      <Modal show={modal} handleClose={hideModal}>
        {modalLoading && <p className="center">loading repositories</p>}
        <ul>
          {!modalLoading &&
            repositories.map((repo) => {
              return (
                <li>
                  {repo.name} - {repo.fork ? "it is forked" : "not forked"} -{" "}
                  {repo.stargazers_count} stars -{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </li>
              );
            })}
        </ul>
      </Modal>
    </div>
  );
};

export default ContributorsList;
