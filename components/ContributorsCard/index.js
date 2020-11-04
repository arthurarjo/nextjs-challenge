import styles from "./ContributorsCard.module.css";

import Button from "../Button";

const ContributorsCard = ({ contributor, seeContributorsRepo }) => {
  return (
    <div className={styles.card}>
      <div className="row space-between">
        <div className={styles.image}>
          <img
            src={contributor.avatar_url}
            alt={contributor.url}
            width={70}
            height={70}
          />
        </div>
        <div>
          <img src="/map-icon.png" alt="" width={32} height={32} />
        </div>
      </div>
      <div className="row">
        <p className={styles.login}>{contributor.login}</p>
      </div>
      <div className="row">
        <p className={styles.contributions}>
          {contributor.contributions} commits
        </p>
      </div>
      <div className="row center">
        <Button
          className={styles.seeRepos}
          onClick={() => seeContributorsRepo(contributor.login)}
        >
          View repositories
        </Button>
      </div>
    </div>
  );
};

export default ContributorsCard;
