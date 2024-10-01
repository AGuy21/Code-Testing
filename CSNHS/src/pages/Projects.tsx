import FetchRepositoryMainFolders from "../backend/FetchGithubRepoData";
import Header from "../components/Header";


const Projects = () => {
  const repoFolders = FetchRepositoryMainFolders();

  console.log(repoFolders[1])


  return (
    <>
      <Header />
      {repoFolders?.map((file, index) => (
        <div key={index}>
          <h4>{file.name}</h4>
          <p>Type: {file.type}</p>
          <p>Size: {file.size} bytes</p>
          <a href={file._links.html} target="_blank" rel="noopener noreferrer">Download</a>
        </div>
      ))}
    </>
  );
};

export default Projects;
