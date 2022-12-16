import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_REPO } from "../gqlOperations/getRepo";
import { GET_REPO_HOOKS } from "../gqlOperations/getRepoHooks";
import { GET_REPO_FILE } from "../gqlOperations/getRepoFile";
import { GET_YML_CONTENT } from "../gqlOperations/getYmlContent";

const Repository = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = React.useState(null);
  const [webhook, setWebhook] = React.useState([])
  const [file, setFile] = React.useState([])
  const { data, loading, error } = useQuery(GET_REPO, {
    variables: {
      name: state.name,
      owner: state.owner,
    },
  });
  const {
    data: hooksData,
    loading: hooksLoading,
    error: hooksError,
  } = useQuery(GET_REPO_HOOKS, {
    variables: {
      name: state.name,
      owner: state.owner,
    },
    onCompleted: data => setWebhook(data?.getWebhook)
  });

  const {
    data: fileData,
    loading: fileLoading,
    error: fileError,
  } = useQuery(GET_REPO_FILE, {
    variables: {
      name: state.name,
      owner: state.owner,
    },
    onCompleted: data=>setFile(data.getContents)
  });
  const [
    getYmlContent,
    { data: ymlData, loading: ymlLoading, error: ymlError },
  ] = useLazyQuery(GET_YML_CONTENT,{
    onCompleted:(data) => {
     setContent(data.getYmlContent.content)
    }
  });

  React.useEffect(() => {
    if(!fileLoading){
    for (let i of file) {
      if (i.path.includes(".yml")) {
        getYmlContent({
          variables: {
            name: state.name,
            owner: state.owner,
            path: i.path
          },
        });
        break;
      }
    }
  }
  }, [file]);

  const goBack = () => {
    navigate("/");
  };
  if (loading) {
    return (
      <div className="loader-center">
        <div class="loader">Loading...</div>
      </div>
    );
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
          <div>
            Root directory files length : {file?.length}{" "}
          </div>
          {webhook && <div>Activ Hooks of the Repository</div>}

          <div>
            {webhook.length > 0 ?
              webhook?.map((hook, index) => {
                return (
                  hook.active && (
                    <div
                      key={index}
                      style={{ border: "2px solid black", marginTop: "5px" }}
                    >
                      <div style={{ padding: "10px" }}>Active : {"true"}</div>
                      <div style={{ padding: "10px" }}>Name : {hook.name}</div>
                      <div style={{ padding: "10px" }}>Type : {hook.type}</div>
                    </div>
                  )
                );
              })
              :
              <div>{"Not Active webhooks"}</div>
            }
          </div>
          <div>Content of yml file</div>
          {
           content ? content.split("\n").map((item,index)=>{
              return <p>{item}</p>

            })
            :
            <div>Yml file not found</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Repository;
