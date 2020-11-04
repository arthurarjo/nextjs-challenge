import React from "react";
import { useRouter } from "next/router";

import styles from "./ContributorsList.module.css";

import Title from "../Title";
import ContributorsCard from "../ContributorsCard";

const ContributorsList = ({ contributors }) => {
  return (
    <div>
      <Title>Top Contributors</Title>

      <div className={styles.grid}>
        {contributors.map((contributor) => {
          return (
            <ContributorsCard key={contributor.id} contributor={contributor} />
          );
        })}
      </div>
    </div>
  );
};

export default ContributorsList;
