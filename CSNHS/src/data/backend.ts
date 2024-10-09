import { RepoFolder } from "../types/RepoFolder";

// All projects i dont want to be shown in the repository folder viewer (.vscode and README)
export const ForbiddenProjects: RepoFolder[] = [{
    "name": ".vscode",
    "path": ".vscode",
    "sha": "e222acc489c2b4f2aaa8b126aa4c76ef3ddc8737",
    "size": 0,
    "url": "https://api.github.com/repos/AGuy21/Code-Testing/contents/.vscode?ref=main",
    "html_url": "https://github.com/AGuy21/Code-Testing/tree/main/.vscode",
    "git_url": "https://api.github.com/repos/AGuy21/Code-Testing/git/trees/e222acc489c2b4f2aaa8b126aa4c76ef3ddc8737",
    "download_url": null,
    "type": "dir",
    "_links": {
        "self": "https://api.github.com/repos/AGuy21/Code-Testing/contents/.vscode?ref=main",
        "git": "https://api.github.com/repos/AGuy21/Code-Testing/git/trees/e222acc489c2b4f2aaa8b126aa4c76ef3ddc8737",
        "html": "https://github.com/AGuy21/Code-Testing/tree/main/.vscode"
    }
}, {
    "name": "README.md",
    "path": "README.md",
    "sha": "3a8ce5ed513062ceb155e125655b085e99d0fb6d",
    "size": 206,
    "url": "https://api.github.com/repos/AGuy21/Code-Testing/contents/README.md?ref=main",
    "html_url": "https://github.com/AGuy21/Code-Testing/blob/main/README.md",
    "git_url": "https://api.github.com/repos/AGuy21/Code-Testing/git/blobs/3a8ce5ed513062ceb155e125655b085e99d0fb6d",
    "download_url": "https://raw.githubusercontent.com/AGuy21/Code-Testing/main/README.md",
    "type": "file",
    "_links": {
        "self": "https://api.github.com/repos/AGuy21/Code-Testing/contents/README.md?ref=main",
        "git": "https://api.github.com/repos/AGuy21/Code-Testing/git/blobs/3a8ce5ed513062ceb155e125655b085e99d0fb6d",
        "html": "https://github.com/AGuy21/Code-Testing/blob/main/README.md"
    }
}];