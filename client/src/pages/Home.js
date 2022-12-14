import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_REPO } from "../gqlOperations/getAllRepo";

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_REPO);

  if (loading) {
    return <div className="loader-center"><div class="loader">Loading...</div></div>;
  }
  return (
    <div className="table-data">
      {/* {data?.getAllRepos?.map((item, index) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            key={index}
          >
            <div>
              <img
                src={item.owner.avatar_url}
                style={{ height: 20, width: 20 }}
              />
            </div>
            <div>{item.name}</div>
            <div>{item.full_name}</div>
            <div>{item.size}</div>
            <div>{item.owner.login}</div>
            <Link
              to="/repo"
              state={{ name: item.name, owner: item.owner.login }}
            >
              <div>{"View Repository"}</div>
            </Link>
          </div>
        );
      })} */}
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Branch Name</th>
            <th>Full Name</th>
            <th>Size</th>
            <th>User Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.getAllRepos?.map((item, index) => {
            return (
              <tr>
                <td>
                <img
                src={item.owner.avatar_url}
                style={{ height: 30, width: 30 }}
              />
                </td>
                <td>{item.name}</td>
                <td>{item.full_name}</td>
                <td>{item.size} KB</td>
                <td>{item.owner.login}</td>
                <td>
                    {
                        item?.permissions?.admin ?
                <Link
              to="/repo"
              state={{ name: item.name, owner: item.owner.login }}
              className="url-link"
            >
              <div>{"View Repository"}</div>
            </Link>
            :
            <div>{"Not Admin"}</div>
                    }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
