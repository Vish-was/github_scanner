import { useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_REPO } from "../gqlOperations/getRepo";

const Repository = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_REPO, {
    variables: {
      name: state.name,
      owner: state.owner,
    },
  });

  const goBack = () => {
    navigate("/");
  };
  if (loading) {
    return <div className="loader-center"><div class="loader">Loading...</div></div>;
  }
  return (
    <div className="data-box">
      <div className="go-to" onClick={goBack}>
        Go to home
      </div>
      <div className="data-listing">
        <div className="data-img">
          <img
            src={data?.getRepo?.owner.avatar_url}
            style={{ height: 100, width: 100 }}
          />
        </div>
        <div className="data-text">
          <div>Branch name : {data?.getRepo?.name}</div>
          <div>Branch full name : {data?.getRepo?.full_name}</div>
          <div>Repository Size : {data?.getRepo?.size} KB</div>
          <div>Private : {data?.getRepo?.private ? "Yes" : "No"}</div>
          <div>Owner name : {data?.getRepo?.owner.login}</div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
