import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ContributorsList from "../components/ContributorsList/";

export default function Home({ contributors: defaultContributors }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState(defaultContributors);

  const loader = useRef(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    loadMoreContributors();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  async function loadMoreContributors() {
    setLoading(true);

    const res = await axios(
      `https://api.github.com/repos/angular/angular/contributors?page=${page}&per_page=25`
    );
    const newContributors = res.data;

    setContributors((old) => {
      return [...old, ...newContributors];
    });

    setLoading(false);
  }

  return (
    <>
      <ContributorsList contributors={contributors} loading={loading} />
      <div className="row center" ref={loader}>
        {loading && <p>Loading</p>}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios(
    "https://api.github.com/repos/angular/angular/contributors?page=1&per_page=25"
  );
  const contributors = res.data;

  return {
    props: {
      contributors,
    },
  };
}
